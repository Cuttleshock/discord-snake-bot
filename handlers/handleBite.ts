import { Command } from './exports';

const handleBite: Command = ({ msg }) => {
    let ret = '';

    ret = 'sssss <I CAN\'T BITE YET>';

    msg.reply(ret);
}

export default handleBite;
