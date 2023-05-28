import { Bard } from 'googlebard';
import { randomUUID } from 'crypto';
import { Prompt } from '@jmrl23/node-prompt';
import config from './config.json';
import chalk from 'chalk';

export class App {
  private conversationId = randomUUID();
  private prompt = new Prompt();

  private bard = new Bard(config.cookies, {
    inMemory: true,
  });

  getConversationId() {
    return this.conversationId;
  }

  getBard() {
    return this.bard;
  }

  async ask() {
    const question = await this.prompt.ask('> ').asString(
      (data) => data.trim(),
      (data) => data || 'Hello',
    );
    const appCommand = await this.isCommand(question);
    if (appCommand) return Promise.resolve('');
    const response = await this.bard.ask(question);
    return chalk.yellow(response);
  }

  private async isCommand(question: string) {
    question = question.toLowerCase();

    if (['quit', 'stop', 'exit'].includes(question)) {
      process.exit(0);
    }

    if (['cls', 'clear'].includes(question)) {
      console.clear();
      console.log(chalk.gray('Console was cleared.'));
      return true;
    }

    return false;
  }
}
