#!/usr/bin/env node

/**
 * Portfolio Content Manager
 * A simple CLI tool to help manage portfolio content
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataPath = path.join(__dirname, 'src', 'data');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function printHeader() {
  console.clear();
  console.log(colors.blue + colors.bright);
  console.log('╔════════════════════════════════════╗');
  console.log('║     Portfolio Content Manager      ║');
  console.log('╚════════════════════════════════════╝');
  console.log(colors.reset);
}

function printMenu() {
  console.log('\n' + colors.yellow + 'Choose an option:' + colors.reset);
  console.log('1. Update Profile Information');
  console.log('2. Add New Project');
  console.log('3. Add Work Experience');
  console.log('4. Update Skills');
  console.log('5. View Current Data');
  console.log('6. Backup Data');
  console.log('7. Exit');
  console.log('');
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function updateProfile() {
  const profilePath = path.join(dataPath, 'profile.json');
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  
  console.log(colors.green + '\n📝 Update Profile Information' + colors.reset);
  console.log('Press Enter to keep current value\n');
  
  const name = await question(`Name (${profile.personal.name}): `);
  if (name) profile.personal.name = name;
  
  const title = await question(`Title (${profile.personal.title}): `);
  if (title) profile.personal.title = title;
  
  const email = await question(`Email (${profile.personal.email}): `);
  if (email) profile.personal.email = email;
  
  const location = await question(`Location (${profile.personal.location}): `);
  if (location) profile.personal.location = location;
  
  fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2));
  console.log(colors.green + '\n✅ Profile updated successfully!' + colors.reset);
}

async function addProject() {
  const projectsPath = path.join(dataPath, 'projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  console.log(colors.green + '\n🚀 Add New Project' + colors.reset);
  
  const project = {
    id: projectsData.projects.length + 1,
    title: await question('Project Title: '),
    category: await question('Category (Full Stack/Frontend/Backend): '),
    description: await question('Short Description: '),
    longDescription: await question('Long Description: '),
    image: await question('Image Path (/images/...): ') || '/images/project.jpg',
    technologies: (await question('Technologies (comma-separated): ')).split(',').map(t => t.trim()),
    features: [],
    liveUrl: await question('Live URL (optional): '),
    githubUrl: await question('GitHub URL (optional): '),
    featured: (await question('Featured project? (y/n): ')).toLowerCase() === 'y'
  };
  
  projectsData.projects.push(project);
  fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));
  console.log(colors.green + '\n✅ Project added successfully!' + colors.reset);
}

async function addExperience() {
  const expPath = path.join(dataPath, 'experience.json');
  const expData = JSON.parse(fs.readFileSync(expPath, 'utf8'));
  
  console.log(colors.green + '\n💼 Add Work Experience' + colors.reset);
  
  const experience = {
    id: expData.experiences.length + 1,
    company: await question('Company Name: '),
    position: await question('Position: '),
    duration: await question('Duration (e.g., 2020 - 2022): '),
    location: await question('Location: '),
    description: await question('Description: '),
    responsibilities: [],
    technologies: (await question('Technologies (comma-separated): ')).split(',').map(t => t.trim())
  };
  
  console.log('Add responsibilities (empty line to finish):');
  let resp;
  while ((resp = await question('- ')) !== '') {
    experience.responsibilities.push(resp);
  }
  
  expData.experiences.unshift(experience); // Add to beginning
  fs.writeFileSync(expPath, JSON.stringify(expData, null, 2));
  console.log(colors.green + '\n✅ Experience added successfully!' + colors.reset);
}

async function updateSkills() {
  const skillsPath = path.join(dataPath, 'skills.json');
  const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  
  console.log(colors.green + '\n🛠️ Update Skills' + colors.reset);
  console.log('Select category:');
  console.log('1. Frontend');
  console.log('2. Backend');
  console.log('3. Tools & Others');
  
  const choice = await question('Choice: ');
  const categoryIndex = parseInt(choice) - 1;
  
  if (categoryIndex >= 0 && categoryIndex < skillsData.categories.length) {
    const category = skillsData.categories[categoryIndex];
    const skillName = await question('Skill Name: ');
    const skillLevel = await question('Skill Level (0-100): ');
    
    category.skills.push({
      name: skillName,
      level: parseInt(skillLevel)
    });
    
    fs.writeFileSync(skillsPath, JSON.stringify(skillsData, null, 2));
    console.log(colors.green + '\n✅ Skill added successfully!' + colors.reset);
  }
}

function viewData() {
  console.log(colors.green + '\n📊 Current Data Files:' + colors.reset);
  const files = fs.readdirSync(dataPath);
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const stats = fs.statSync(path.join(dataPath, file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  • ${file} (${size} KB)`);
    }
  });
}

function backupData() {
  const backupDir = path.join(__dirname, 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-${timestamp}`);
  fs.mkdirSync(backupPath);
  
  const files = fs.readdirSync(dataPath);
  files.forEach(file => {
    if (file.endsWith('.json')) {
      fs.copyFileSync(
        path.join(dataPath, file),
        path.join(backupPath, file)
      );
    }
  });
  
  console.log(colors.green + `\n✅ Backup created at: ${backupPath}` + colors.reset);
}

async function main() {
  printHeader();
  
  let running = true;
  while (running) {
    printMenu();
    const choice = await question('Enter choice: ');
    
    switch(choice) {
      case '1':
        await updateProfile();
        break;
      case '2':
        await addProject();
        break;
      case '3':
        await addExperience();
        break;
      case '4':
        await updateSkills();
        break;
      case '5':
        viewData();
        break;
      case '6':
        backupData();
        break;
      case '7':
        running = false;
        console.log(colors.blue + '\nGoodbye! 👋' + colors.reset);
        break;
      default:
        console.log(colors.red + 'Invalid choice!' + colors.reset);
    }
    
    if (running && choice !== '5') {
      await question('\nPress Enter to continue...');
      printHeader();
    }
  }
  
  rl.close();
}

// Run the manager
main().catch(err => {
  console.error(colors.red + 'Error:', err.message + colors.reset);
  rl.close();
});