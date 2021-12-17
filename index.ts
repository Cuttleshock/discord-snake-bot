import * as dotenv from 'dotenv-flow';
dotenv.config();

import Discord from 'discord.js';

import * as vals from './values';

import runCommand from './handlers/exports';

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

    runCommand(command, {
        msg,
        args,
        client
    });
});

const shouldQuickExitMessage = (msg: Discord.Message) => {
    if (msg.author.bot
     || !msg.content.startsWith(vals.prefix)
     || !msg.guild
    ) return true;

    return false;
}
