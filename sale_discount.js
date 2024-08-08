const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); 

rl.question('Please enter all the items purchased separated by a comma\n', (input) => {
  const items = input.split(',').map(item => item.trim());
  console.log(items)

  rl.close();
});