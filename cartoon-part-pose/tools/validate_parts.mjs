import fs from 'node:fs';
import path from 'node:path';

function validate(partsPath) {
  if (!fs.existsSync(partsPath)) {
    console.error(`[Error] File not found: ${partsPath}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(partsPath, 'utf-8'));
  } catch (err) {
    console.error(`[Error] Invalid JSON: ${err.message}`);
    process.exit(1);
  }

  const errors = [];

  // Required fields
  const required = ['id', 'granularity', 'split_mode', 'parts'];
  for (const field of required) {
    if (!data[field]) {
      errors.push(`Missing required field: '${field}'`);
    }
  }

  // Enums
  if (data.granularity && !['medium', 'fine'].includes(data.granularity)) {
    errors.push(`Invalid granularity: ${data.granularity}. Must be 'medium' or 'fine'.`);
  }
  if (data.split_mode && !['semantic', 'cutout'].includes(data.split_mode)) {
    errors.push(`Invalid split_mode: ${data.split_mode}. Must be 'semantic' or 'cutout'.`);
  }

  // Parts array
  if (data.parts && Array.isArray(data.parts)) {
    data.parts.forEach((part, index) => {
      if (!part.id || !part.label) {
        errors.push(`parts[${index}] missing required fields: 'id' and 'label'`);
      }
      if (part.side && !['L', 'R', 'C'].includes(part.side)) {
        errors.push(`parts[${index}].side invalid: ${part.side}. Must be 'L', 'R', or 'C'.`);
      }
    });
  } else if (data.parts) {
    errors.push(`'parts' field must be an array.`);
  }

  if (errors.length > 0) {
    console.error(`\n[Validation Failed] ${partsPath}`);
    errors.forEach(e => console.error(`  - ${e}`));
    console.error('\nPlease fix the above errors and regenerate.');
    process.exit(1);
  }

  console.log(`[Validation Passed] ${partsPath} is valid according to cartoon-part-pose schema.`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node validate_parts.mjs <path-to-parts.json>');
  process.exit(1);
}

validate(args[0]);
