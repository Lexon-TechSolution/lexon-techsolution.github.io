import fs from 'fs';
try {
  const rules = fs.readFileSync('./firestore.rules', 'utf8');
  console.log('RULES CONTENT:', JSON.stringify(rules));
  const codes = [];
  for (let i = 0; i < Math.min(50, rules.length); i++) {
    codes.push(rules.charCodeAt(i));
  }
  console.log('CHAR CODES:', codes);
} catch (e) {
  console.error(e);
}
