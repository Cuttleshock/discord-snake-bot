import Discord from 'discord.js';

import config from '../config-secrets/config-hw-bot.json';
import * as vals from './values';

const client = new Discord.Client();

client.login(config.BOT_TOKEN);

const shouldQuickExitMessage = (msg: Discord.Message) => {
    if (msg.author.bot
     || !msg.content.startsWith(vals.prefix)
    ) return true;

    return false;
}

const handlePing = async (msg: Discord.Message, args: Array<string>) => {
    const res = await msg.channel.send(`\u200Bwait`);
    const timeTaken = res.createdTimestamp - msg.createdTimestamp;
    res.edit(`\u200B${timeTaken}ms`);
}
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
            handlePing(msg, args);
            break;

        default:
            break;
    }
});
