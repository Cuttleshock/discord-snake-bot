import * as Discord from 'discord.js';

const handleBite = (msg: Discord.Message): void => {
    let ret = '';

    ret = 'sssss <I CAN\'T BITE YET>';

    msg.reply(ret);
}

export default handleBite;
