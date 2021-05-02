import * as Discord from 'discord.js';

const handleSus = async (msg: Discord.Message): Promise<void> => {
    let ret = '';

    // fetch the last message before this and sus its text
    ret = 'hssss <IMPLEMENTATION IN PROGRESS>';

    msg.channel.send(ret);
}

export default handleSus;
