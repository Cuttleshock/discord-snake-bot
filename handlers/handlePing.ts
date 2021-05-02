import * as Discord from 'discord.js';

export const handlePing = async (msg: Discord.Message): Promise<void> => {
    const res = await msg.channel.send(`\u200Bsss... wait...`);
    const timeTaken = res.createdTimestamp - msg.createdTimestamp;
    res.edit(`\u200B${timeTaken}msss`);
}

export default handlePing;
