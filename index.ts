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

const geometricDistribution = (p: number, max: number) => {
    if (p < 0 || 1 <= p) {
        throw new Error(`Impossible probability ${p} passed into geometricDistribution()`);
    }

    let i: number;

    for (i = 0; i < max; ++i) {
        if (Math.random() <= p) return i;
    }

    return i;
}

const splitWordlike = (str: string) => {
    return str.split(vals.splitRegex);
}

const sussify = (str: string) => {
    let ret: string;

    const len = str.length;
    const splitPoint = len - geometricDistribution(0.3, (2*len)/3);

    ret = str.substring(0, splitPoint + 1);

    for (let i = ret.length - 1; i >= 0; --i) {
        ret += ret[i];
    }

    return ret;
}

const handleSus = async (msg: Discord.Message) => {
    let ret: string = 'implementation in progress';

    // fetch the last message before this and sus its text

    msg.channel.send(ret);
}

const handleSees = async (msg: Discord.Message) => {
    let ret: string = 'implementation in progress';

    // fetch the last message before this, split it up and sus each word

    msg.channel.send(ret);
}

const handleSusName = async (msg: Discord.Message, args: Array<string>) => {
    let ret: string = 'oops broken';
    msg.channel.send(ret);
    return;

    let target: Discord.GuildMember = msg.member;
    let splitWords: boolean = false;

    const user = msg.mentions.members.first();
    if (user) {
        target = user;
    }

    for (let i = 0; i < args.length; ++i) {
        if (args[i] === 'split') {
            splitWords = true;
        }
    }

    const oldName = msg.guild.member(target).nickname;
    let newName: string;

    if (splitWords) {
        const oldNameArray = splitWordlike(oldName);
        for (let i = 0; i < oldNameArray.length; ++i) {
            oldNameArray[i] = sussify(oldNameArray[i]);
        }
        newName = oldNameArray.join(' ');
    } else {
        newName = sussify(oldName);
    }

    const nameSet = await msg.guild.member(user).setNickname(newName);
    
    if (nameSet.nickname === newName) {
        msg.reply(`Nickname successfully changed: ${oldName} -> ${newName}`);
    } else {
        msg.reply(`Couldn't sus name: permission error?`);
    }

}

const handleEmbed = (msg: Discord.Message, args: Array<string>) => {
    const ret = new Discord.MessageEmbed();

    ret.setColor('#990000');
    ret.setTitle('snakes');
    ret.setAuthor('bungles', client.user.avatarURL());
    ret.setDescription('magical wonderful embed');
    ret.addFields(
        { name: 'field1', value: 'value1', inline: true },
        { name: 'field2', value: 'value2', inline: true },
        { name: 'field3', value: 'value3', inline: true },
        { name: 'field4', value: 'value4', inline: true },
        { name: 'field5', value: 'value5', inline: true },
        { name: 'field6', value: 'value6', inline: true },
        { name: 'field7', value: 'value7', inline: true },
    );
    ret.setImage('https://archives.bulbagarden.net/media/upload/d/d8/Spr_5b_556.png');
    ret.setFooter('foot', 'https://cdn.bulbagarden.net/upload/a/a3/556MS8.png');

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

        case 'sus':
            handleSus(msg);
            break;

        case 'sees':
            handleSees(msg);
            break;

        case 'susname':
            handleSusName(msg, args);
            break;

        case 'embed':
            handleEmbed(msg, args);
            break;

        default:
            break;
    }
});
