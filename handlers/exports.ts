import Discord from 'discord.js';

import bite from './handleBite';
import embed from './handleEmbed';
import ping from './handlePing';
import sees from './handleSees';
import snakes from './handleSnakes';
import sus from './handleSus';
import susName from './handleSusName';

const commandNotFound: Command = ({ command, msg }) => {
    msg.reply(`Sorry, we don't like "${command}" here at BarbieWorld`);
}

const handler = new Proxy<{ [command: string]: Command }>({
    bite,
    embed,
    ping,
    sees,
    snakes,
    sus,
    susName,
}, {
    get: function(target, key: string) {
        return target[key] ?? commandNotFound;
    },
});

export default function runCommand(command: string, args: Omit<HandlerParams, 'command'>): ReturnType<Command> {
    return handler[command]({ ...args, command });
}

interface HandlerParams {
    command: string,
    msg: Discord.Message,
    args: Array<string>,
    client: Discord.Client,
}

export type Command = (params: HandlerParams) => void | Promise<void>;
