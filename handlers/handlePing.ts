import * as Discord from 'discord.js';

export const handlePing = async (msg: Discord.Message, args: Array<string>) => {
    const res = await msg.channel.send(`\u200Bwait`);
    const timeTaken = res.createdTimestamp - msg.createdTimestamp;
    res.edit(`\u200B${timeTaken}ms`);
}

export default handlePing;
