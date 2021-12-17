import { Command } from './exports';

const handleSus: Command = async ({ msg }) => {
    let ret = '';

    // fetch the last message before this and sus its text
    ret = 'hssss <IMPLEMENTATION IN PROGRESS>';

    msg.channel.send(ret);
}

export default handleSus;
