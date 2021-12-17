import { Command, HandlerParams } from '@types';

import bite from './handleBite';
import embed from './handleEmbed';
import ping from './handlePing';
import snakes from './handleSnakes';
import react from './handleReact';
import hmu from './handleHmu';

const commandNotFound: Command = ({ command, msg }) => {
    msg.reply(`Sorry, we don't like "${command}" here at BarbieWorld`);
}

const handler = new Proxy<{ [command: string]: Command }>({
    bite,
    embed,
    ping,
    snakes,
    react,
    hmu,
}, {
    get: function(target, key: string) {
        return target[key] ?? commandNotFound;
    },
});

export default function runCommand(command: string, args: Omit<HandlerParams, 'command'>): ReturnType<Command> {
    return handler[command]({ ...args, command });
}
