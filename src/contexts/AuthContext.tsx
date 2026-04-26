"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, type JesAIUser } from "@/lib/auth/supabase-auth";

interface AuthContextValue {
  user: JesAIUser | null;
  loading: boolean;
  isPaid: boolean;
  tier: string;
  queriesRemaining: number;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isPaid: false,
  tier: "free",
  queriesRemaining: 20,
  refreshUser: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JesAIUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [tier, setTier] = useState("free");
  const [queriesRemaining, setQueriesRemaining] = useState(20);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile) {
        // Check if tier has expired
        let currentIsPaid = profile.is_paid;
        let currentTier = profile.tier || "free";
        if (profile.tier_expires_at && new Date(profile.tier_expires_at) < new Date()) {
          currentIsPaid = false;
          currentTier = "free";
        }
        setUser({ ...profile, is_paid: currentIsPaid, tier: currentTier });
        setIsPaid(currentIsPaid);
        setTier(currentTier);

        // Calculate daily queries remaining
        const tierLimits: Record<string, number> = {
          free: 20,
          basic: 50,
          pro: 999,
          professional: 9999,
        };
        const dailyLimit = tierLimits[currentTier] ?? 20;
        const used = profile.queries_today ?? 0;
        setQueriesRemaining(Math.max(0, dailyLimit - used));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      await fetchUserProfile(authUser.id);
    } else {
      setUser(null);
      setIsPaid(false);
      setTier("free");
      setQueriesRemaining(20);
    }
  }, [fetchUserProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsPaid(false);
    setTier("free");
    setQueriesRemaining(20);
  }, []);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth state changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsPaid(false);
        setTier("free");
        setQueriesRemaining(20);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  return (
    <AuthContext.Provider value={{ user, loading, isPaid, tier, queriesRemaining, refreshUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
