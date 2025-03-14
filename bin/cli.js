#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = path.join(__dirname, '..', 'template');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Get the target project directory from command line args
const projectName = process.argv[2];

if (!projectName) {
  console.error(`${colors.red}Error: Please specify a project name:${colors.reset}`);
  console.error(`  ${colors.cyan}npm create vite-shadcn-stripe my-project${colors.reset}`);
  console.error(`  ${colors.cyan}yarn create vite-shadcn-stripe my-project${colors.reset}`);
  console.error(`  ${colors.cyan}pnpm create vite-shadcn-stripe my-project${colors.reset}`);
  console.error(`  ${colors.cyan}bun create vite-shadcn-stripe my-project${colors.reset}`);
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);

// Check if directory already exists
if (fs.existsSync(targetDir)) {
  console.error(`${colors.red}Error: Directory ${projectName} already exists.${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.blue}Creating a new Vite + shadcn/ui + Stripe project in ${colors.cyan}${targetDir}${colors.reset}`);

// Create project directory
try {
  fs.mkdirSync(targetDir, { recursive: true });
} catch (error) {
  console.error(`${colors.red}Failed to create directory: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Function to copy files recursively
function copyFilesRecursively(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Get all items in source directory
  const items = fs.readdirSync(source, { withFileTypes: true });

  // Process each item
  for (const item of items) {
    const sourcePath = path.join(source, item.name);
    const targetPath = path.join(target, item.name);

    if (item.isDirectory()) {
      // If it's a directory, recursively copy its contents
      copyFilesRecursively(sourcePath, targetPath);
    } else {
      // If it's a file, copy it
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

// Copy template files to target directory
try {
  console.log(`${colors.blue}Copying template files...${colors.reset}`);
  copyFilesRecursively(templateDir, targetDir);
} catch (error) {
  console.error(`${colors.red}Failed to copy template files: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Change to the project directory
process.chdir(targetDir);

// Update package.json with the project name
try {
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
} catch (error) {
  console.error(`${colors.red}Failed to update package.json: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Create a gitignore file if it doesn't exist
const gitignorePath = path.join(targetDir, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  try {
    const gitignoreContent = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
`;
    fs.writeFileSync(gitignorePath, gitignoreContent);
  } catch (error) {
    console.warn(`${colors.yellow}Warning: Failed to create .gitignore file: ${error.message}${colors.reset}`);
  }
}

console.log(`\n${colors.green}✅ Project ${colors.cyan}${projectName}${colors.green} created successfully!${colors.reset}`);
console.log(`\n${colors.blue}Next steps:${colors.reset}`);
console.log(`  ${colors.cyan}cd ${projectName}${colors.reset}`);
console.log(`  ${colors.cyan}npm install${colors.reset} or ${colors.cyan}bun install${colors.reset}`);
console.log(`  ${colors.cyan}npm run dev${colors.reset} or ${colors.cyan}bun run dev${colors.reset}`);
console.log(`\n${colors.blue}To initialize shadcn/ui:${colors.reset}`);
console.log(`  ${colors.cyan}npx shadcn-ui@latest init${colors.reset}`);
console.log(`or`);
console.log(`  ${colors.cyan}bunx --bun shadcn@latest init${colors.reset}`);
console.log(`\n${colors.blue}Don't forget to:${colors.reset}`);
console.log(`  1. Set up your ${colors.cyan}.env${colors.reset} file (see ${colors.cyan}.env.example${colors.reset})`);
console.log(`  2. Configure your Stripe and Supabase accounts as described in the README`);
console.log(`\n${colors.green}Happy coding! 🚀${colors.reset}`);

// Make the CLI script executable
try {
  fs.chmodSync(path.join(__dirname, 'cli.js'), '755');
} catch (error) {
  // This may fail in Windows, but it's not critical
}