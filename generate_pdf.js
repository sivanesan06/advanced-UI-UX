import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const browser = fs.existsSync(chromePath) ? chromePath : edgePath;
const htmlPath = path.resolve('generate_pdf.html');
const pdfPath = path.resolve('UI_UX_Project_Report_TrustDrive_AI.pdf');

console.log('Using browser:', browser);
console.log('HTML path:', htmlPath);
console.log('Target PDF:', pdfPath);

const cmd = `"${browser}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;

console.log('Executing command...');
try {
  const result = execSync(cmd, { stdio: 'inherit' });
  console.log('Done!');
  if (fs.existsSync(pdfPath)) {
    const stat = fs.statSync(pdfPath);
    console.log(`SUCCESS: PDF created successfully! Size: ${stat.size} bytes`);
  } else {
    console.error('ERROR: PDF file not found after command.');
  }
} catch (err) {
  console.error('Execution failed:', err);
}

