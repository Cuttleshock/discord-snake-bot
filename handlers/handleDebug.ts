import { Command } from '@types';
import bulkDerange, { proceduralDerange } from '../helpers/derange';

const handleDebug: Command = async ({ msg, args }) => {
    if (!process.env.DEBUG) {
        msg.channel.send('no');
        return;
    }

    if (args.length < 2) {
        msg.channel.send('2 numbers pls');
        return;
    }

    const setSize = parseInt(args[0]);
    const repeats = parseInt(args[1]);
    if (isNaN(setSize) || isNaN(repeats)) {
        msg.channel.send('2 __numbers__ please');
        return;
    }

    msg.channel.send('gotcha :snake:');
    console.log('procedural:');
    for (let i = 0; i < repeats; ++i) {
        console.log(proceduralDerange(setSize));
    }
    console.log('bulk:');
    for (let i = 0; i < repeats; ++i) {
        console.log(bulkDerange(setSize));
    }
}

export default handleDebug;
