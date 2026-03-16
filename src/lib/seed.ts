import { db } from "@/db";
import { users, services } from "@/db/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  
  const [admin] = await db.insert(users).values({
    name: "Admin JesAI",
    email: "admin@jesai.com",
    password: adminPassword,
    role: "admin",
    phone: "+8801700000000",
    isActive: true,
  }).onConflictDoNothing().returning();
  
  console.log("Created admin user:", admin.email);

  // Create test user
  const userPassword = await bcrypt.hash("user123", 12);
  
  const [testUser] = await db.insert(users).values({
    name: "Test User",
    email: "user@jesai.com",
    password: userPassword,
    role: "user",
    phone: "+8801700000001",
    isActive: true,
  }).onConflictDoNothing().returning();
  
  console.log("Created test user:", testUser.email);

  // Create default services
  const defaultServices = [
    {
      title: "Basic Legal Info",
      titleBn: "মৌলিক আইনি তথ্য",
      description: "General information about Bangladesh laws",
      descriptionBn: "বাংলাদেশের আইন সম্পর্কে সাধারণ তথ্য",
      category: "General",
      price: 0,
      isFree: true,
      isPopular: false,
      icon: "Scale",
    },
    {
      title: "Premium Consultation",
      titleBn: "প্রিমিয়াম পরামর্শ",
      description: "Detailed legal guidance with step-by-step procedures",
      descriptionBn: "ধাপে ধাপে পদ্ধতি সহ বিস্তারিত আইনি পদ্ধতি নির্দেশনা",
      category: "Premium",
      price: 499,
      isFree: false,
      isPopular: true,
      icon: "Crown",
    },
    {
      title: "Expert Advisory",
      titleBn: "বিশেষজ্ঞ পরামর্শ",
      description: "Connect with licensed Supreme Court Advocates",
      descriptionBn: "লাইসেন্সধারী সুপ্রিম কোর্ট অ্যাডভোকেটদের সাথে যোগাযোগ",
      category: "Expert",
      price: 2499,
      isFree: false,
      isPopular: false,
      icon: "Shield",
    },
    {
      title: "Corporate Package",
      titleBn: "কর্পোরেট প্যাকেজ",
      description: "Complete legal solution for businesses",
      descriptionBn: "ব্যবসার জন্য সম্পূর্ণ আইনি সমাধান",
      category: "Business",
      price: 9999,
      isFree: false,
      isPopular: false,
      icon: "Zap",
    },
  ];

  for (const service of defaultServices) {
    await db.insert(services).values(service).onConflictDoNothing();
  }
  
  console.log("Created default services");

  console.log("Seed completed!");
}

seed().catch(console.error);
