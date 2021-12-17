import { Command } from './exports';

const handleSees: Command = async ({ msg }) => {
    let ret = '';

    // TODO: Fetch the last message before this, split it up and sus each word
    ret = 'sssss <I CAN\'T DO THAT YET>';

    msg.channel.send(ret);
}

export default handleSees;
