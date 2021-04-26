import * as Discord from 'discord.js';

import { splitWordlike } from '../helpers/splitWords';
import { sussify } from '../helpers/sussify';

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

export default handleSusName;