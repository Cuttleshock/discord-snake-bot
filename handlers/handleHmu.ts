import { Command } from '@types';

const handleHmu: Command = async ({ msg }) => {
    const response = await msg.channel.send('react for a ssspecial sssurprise');

    const collector = response.createReactionCollector(() => true, {
        idle: 10*1000,
        time: 60*1000,
    });

    const messaged = new Set<string>();

    collector.on('collect', async reaction => {
        const users = await reaction.users.fetch();

        users.forEach(async u => {
            if (messaged.has(u.id)) {
                return;
            } else {
                messaged.add(u.id);
                const dm = await u.createDM();
                dm.send(':snake:');
            }
        });
    });
}

export default handleHmu;
