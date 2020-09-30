const Discord = require('discord.js');
const config = require('../config-secrets/config-hw-bot.json');

const client = new Discord.Client();

client.login(config.BOT_TOKEN);
