import { Command } from '@types';

const handleReact: Command = async ({ msg }) => {
    const response = await msg.channel.send('react me!');

    const collector = response.createReactionCollector(() => true, {
        idle: 10*1000,
        time: 60*1000,
    });

    collector.on('end', async collected => {
        let response = 'You made the following reactions:';

        for (const c of collected.values()) {
            const users = await c.users.fetch();
            response += `\n${c.emoji.name} from`;
            users.forEach(u => {
                response += ` ${u}`;
            });
        }

        msg.channel.send(response);
    });
}

export default handleReact;
