import * as vals from '../values';
import { Command } from '@types';

const handleSnakes: Command = ({ msg, args }) => {
    if (args.length === 0) {
        msg.channel.send('how many??');
        return;
    }

    const howMany = parseFloat(args[0]);

    if (isNaN(howMany)) {
        msg.channel.send('no!');
        return;
    } else if (!Number.isInteger(howMany)) {
        msg.channel.send('weird');
        return;
    } else if (howMany > 10 || howMany < -10) {
        msg.channel.send('too many...');
        return;
    } else if (howMany === 0) {
        msg.channel.send('no snakes...');
        return;
    }

    let ret = '';

    if (args[1] !== undefined) {
        if (vals.smallWords.includes(args[1])) {
            ret += '\u200B';
        }
    }

    if (howMany > 0) {
        for (let i = 0; i < howMany; ++i) {
            ret += ':snake: ';
        }    
    } else if (howMany < 0) {
        for (let i = 0; i > howMany; --i) {
            ret += ':worm: ';
        }
    }

    msg.channel.send(ret);
}

export default handleSnakes;
