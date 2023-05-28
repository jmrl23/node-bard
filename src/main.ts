import { App } from './app.js';
import chalk from 'chalk';

async function main() {
  const app = new App();

  console.clear();
  console.log('Loading..');

  const greetings = await app.getBard().ask('Hello');

  console.clear();
  console.log(chalk.yellow(greetings.trim()));

  while (true) {
    const response = await app.ask();
    if (response.length > 0) console.log('\n' + response);
  }
}

main().catch((error) => {
  if (error instanceof Error) {
    console.log(error.message);
  }
});
