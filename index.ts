import * as dotenv from 'dotenv-flow';
dotenv.config();

import Discord from 'discord.js';

import * as vals from './values';

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const shouldQuickExitMessage = (msg: Discord.Message) => {
    if (msg.author.bot
     || !msg.content.startsWith(vals.prefix)
     || !msg.guild
    ) return true;

    return false;
}

const handlePing = async (msg: Discord.Message, args: Array<string>) => {
    const res = await msg.channel.send(`\u200Bwait`);
    const timeTaken = res.createdTimestamp - msg.createdTimestamp;
    res.edit(`\u200B${timeTaken}ms`);
}

const handleSnakes = (msg: Discord.Message, args: Array<string>) => {
    if (args.length === 0) {
        msg.channel.send(`how many??`);
        return;
    }

    const howMany = parseFloat(args[0]);

    if (isNaN(howMany)) {
        msg.channel.send(`no!`);
        return;
    } else if (!Number.isInteger(howMany)) {
        msg.channel.send(`weird`);
        return;
    } else if (howMany > 10 || howMany < -10) {
        msg.channel.send(`too many...`);
        return;
    } else if (howMany === 0) {
        msg.channel.send(`no snakes...`);
        return;
    }

    let ret = ``;

    if (args[1] !== undefined) {
        if (vals.smallWords.includes(args[1])) {
            ret += `\u200B`;
        }
    }

    if (howMany > 0) {
        for (let i = 0; i < howMany; ++i) {
            ret += `:snake: `;
        }    
    } else if (howMany < 0) {
        for (let i = 0; i > howMany; --i) {
            ret += `:worm: `;
        }
    }
    msg.channel.send(ret);
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

        case 'snakes':
            handleSnakes(msg, args);
            break;

        default:
            break;
    }
});
