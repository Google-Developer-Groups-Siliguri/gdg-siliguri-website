/* tslint:disable */
// @ts-nocheck

declare var require: any;
declare var process: any;
const { writeFile, existsSync, mkdirSync } = require('fs');

// need yargs to pass the command line arguments
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;

//helper function to dynamically copy env variables into respective files if file dosen't exist, it'll make a new file on path
function writeFileUsingFS(targetPath, fileContent) {
  writeFile(targetPath, fileContent, function (err) {
    if (err) {
      console.log(err);
    }

    if (fileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

//path for the environment directory
const envDirectory = './src/environments';

//create a env directory if that directory dosen't exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//create 'environment.ts' and 'environment.prod.ts' if that dosent exist
writeFileUsingFS('./src/environments/environment.development.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

//check if argument of prod was given while built command
const isProduction = environment === 'prod';

//choose the correct file according to the configuration argument prod or not

const targetPath = isProduction
  ? './src/environments/environment.ts'
  : './src/environments/environment.development.ts';

//content to be compiled according to the target file
console.log('Getting env variable ------------------', environment);
const environmentFileContent = `
  //this file was autogenerated by dynamically running script file

  export const environment = {
      production: ${isProduction},
      apiKey: '${process.env.apiKey}',
      authDomain: '${process.env.authDomain}',
      databaseURL: '${process.env.databaseURL}',
      storageBucket: '${process.env.storageBucket}',
      messagingSenderId: '${process.env.messagingSenderId}',
      appId: '${process.env.appId}',
    }
`;

writeFileUsingFS(targetPath, environmentFileContent); //appending file data

/*tslint:enable */
