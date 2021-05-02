import * as Discord from 'discord.js';

const handleEmbed = (msg: Discord.Message, args: Array<string>, client: Discord.Client): void => {
    const ret = new Discord.MessageEmbed();

    ret.setColor('#990000');
    ret.setTitle('snakes');
    ret.setAuthor('bungles', client.user.avatarURL());
    ret.setDescription('magical wonderful embed');
    ret.addFields(
        { name: 'field1', value: 'value1', inline: true },
        { name: 'field2', value: 'value2', inline: true },
        { name: 'field3', value: 'value3', inline: true },
        { name: 'field4', value: 'value4', inline: true },
        { name: 'field5', value: 'value5', inline: true },
        { name: 'field6', value: 'value6', inline: true },
        { name: 'field7', value: 'value7', inline: true },
    );
    ret.setImage('https://archives.bulbagarden.net/media/upload/d/d8/Spr_5b_556.png');
    ret.setFooter('foot', 'https://cdn.bulbagarden.net/upload/a/a3/556MS8.png');

    msg.channel.send(ret);
}

export default handleEmbed;
