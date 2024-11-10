const inquirer = require('inquirer').default;
const fs = require('fs'); // This will write the README file later
const path = require('path');

const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'How do you install your project?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide usage instructions:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Provide guidelines for contributing:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide test instructions:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address for contact purposes:',
    },
  ];
  
  function promptUser() {
    return inquirer.prompt(questions);
  }

  promptUser()
  .then((answers) => {
    const markdown = generateMarkdown(answers);
    fs.writeFileSync(path.join(__dirname, 'output', 'README.md'), markdown);
    console.log('README.md has been generated in the output folder!');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  function generateMarkdown(answers) {
    return `
  # ${answers.title}
  
  ${renderLicenseBadge(answers.license)}
  
  ## Description
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  This project is licensed under the ${answers.license} license.
  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  If you have any questions about the repo, feel free to contact me:
  - GitHub: [${answers.github}](https://github.com/${answers.github})
  - Email: ${answers.email}
    `;
  }
  function renderLicenseBadge(license) {
    if (license !== 'None') {
      return `![License Badge](https://img.shields.io/badge/license-${license}-blue.svg)`;
    }
    return '';
  }
  