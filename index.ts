import Discord from 'discord.js';
import config from '../config-secrets/config-hw-bot.json';

const client = new Discord.Client();

client.login(config.BOT_TOKEN);
