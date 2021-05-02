import * as Discord from 'discord.js';

const handleSees = async (msg: Discord.Message): Promise<void> => {
    let ret = '';

    // TODO: Fetch the last message before this, split it up and sus each word
    ret = 'sssss <I CAN\'T DO THAT YET>';

    msg.channel.send(ret);
}

export default handleSees;
