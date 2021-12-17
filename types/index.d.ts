import * as Discord from 'discord.js';

interface HandlerParams {
    command: string,
    msg: Discord.Message,
    args: Array<string>,
    client: Discord.Client,
}

type Command = (params: HandlerParams) => void | Promise<void>;
