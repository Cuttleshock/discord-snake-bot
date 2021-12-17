import * as dotenv from 'dotenv-flow';
dotenv.config();

import Discord from 'discord.js';

import * as vals from './values';

import handlers from './handlers/exports';

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: Discord.Message) => {
    if (shouldQuickExitMessage(msg)) return;

    const commandBody = msg.content.slice(vals.prefixLen);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            handlers.ping(msg);
            break;
        case 'snakes':
            handlers.snakes(msg, args);
            break;
        case 'sus':
            handlers.sus(msg);
            break;
        case 'sees':
            handlers.sees(msg);
            break;
        // case 'susname':
        //     handlers.susName(msg, args);
        //     break;
        case 'embed':
            handlers.embed(msg, args, client);
            break;
        default:
            break;
    }
});

const shouldQuickExitMessage = (msg: Discord.Message) => {
    if (msg.author.bot
     || !msg.content.startsWith(vals.prefix)
     || !msg.guild
    ) return true;

    return false;
}
