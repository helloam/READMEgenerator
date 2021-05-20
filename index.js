const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the author name?',
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your Github username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is your project title?',
    },
    {
      type: 'input',
      name: 'contributor',
      message: 'Any contributions for this project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a brief description of your project',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How will this be used?',
    },
    {
      type: 'input',
      name: 'install',
      message: 'How should one install this?',
    },
    {
      type: 'checkbox',
      name: 'license',
      message: 'What license should your project have?',
      choices: ["Boost", "Apache", "MIT", "ISC", "Perl"]
    },
    {
      type: 'input',
      name: 'test',
      message: 'Please provide testing instructions',
    },
  ]);
};


function generateRM(answers){
  var profile=("https://github.com/"+answers.github)
return `
# ${answers.title}

## Description 
   ${answers.description}
## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Installation
      ${answers.install}
## Usage 
      ${answers.usage}
## License
  
      ${answers.license}
## Contributing
      ${answers.contributor}
## Tests
      ${answers.test}
## Questions
For questions regarding this application please contact me at:
  - E-mail ${answers.email}
  - Github:
  <${profile}>
  `; 
}

async function init() {
  console.log("Welcome to my README generator!");
  try{
      const answers=await promptUser();
      const rm=generateRM(answers);
      await writeFileAsync("README.md",rm);
      console.log('Successfully created a README file!');
  } catch(err){
      console.log(err);
  }
}
init();

