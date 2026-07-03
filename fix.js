const fs = require('fs');
const bt = String.fromCharCode(96);
const re = new RegExp(bt + '[^' + bt + ']*' + bt, 'g');
const files = [
  'src/lib/knowledge/tax.ts',
  'src/lib/knowledge/nrb.ts',
  'src/lib/knowledge/constitutional.ts'
];
files.forEach(function(f) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(re, function(m) {
    return bt + m.slice(1, -1).split('').filter(function(ch) {
      return ch.charCodeAt(0) < 128;
    }).join('') + bt;
  });
  fs.writeFileSync(f, c, 'utf8');
  console.log('Fixed:', f);
});