import * as Discord from 'discord.js';

import * as fs from 'fs';

import { baseDir } from '../values';

export const handlePing = async (msg: Discord.Message): Promise<void> => {
    if (Math.random() < 0.5) {
        const res = await msg.channel.send('\u200Bsss... wait...');
        const timeTaken = res.createdTimestamp - msg.createdTimestamp;
        res.edit(`\u200B${timeTaken}msss`);
    } else {
        fs.readdir(`${baseDir}/ping/`, (err, files) => {
            if (!!err) {
                console.error(err);
            } else {
                console.log(files);
                const index = Math.floor(Math.random()*files.length);
                const attachment = new Discord.MessageAttachment(`${baseDir}/ping/${files[index]}`);
                msg.channel.send(attachment);
            }
        });
    }
}

export default handlePing;
