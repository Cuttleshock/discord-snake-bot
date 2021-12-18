import { Command } from '@types';
import { MessageReaction, User } from 'discord.js';

const SANTA_MAX_ATTEMPTS = 10;

const handleSanta: Command = async ({ msg, client }) => {
    const response = await msg.channel.send('If you weren\'t mentioned, react with a valid pastry to join the Secret Santa exchange!');
    response.react('🥐');

    const collector = response.createReactionCollector((reaction: MessageReaction) => {
        return reaction.emoji.name === '🥐';
    }, {
        idle: 10*1000,
        time: 60*1000,
    });

    collector.on('end', async collected => {
        const users: Array<User> = [];

        for (const c of collected.values()) {
            const collectedUsers = await c.users.fetch();
            for (const u of [...collectedUsers.values(), ...msg.mentions.users.values()]) {
                if (u.id === client.user.id || u.bot) {
                    continue;
                } // else:
                users.push(u);
            }
        }

        if (users.length <= 2) {
            return msg.channel.send(`Only ${users.length} people joined, not enough :snake:`);
        } // else:

        const cycles: Array<Array<User>> = [];
        cycles.push([users[0]]);
        let i: number;

        while (users.length > 1) {
            if (users.length === 2) {
                i = 1; // Match with only remaining person (should be able to combine w/ below)
            } else if (cycles[cycles.length-1].length === 1) {
                i = Math.floor(Math.random()*(users.length-1)) + 1; // Don't match self
            } else {
                i = Math.floor(Math.random()*users.length); // Match anybody, including self
            }
            if (i === 0) {
                users.splice(i,1);
                cycles.push([users[0]]);
            } else {
                cycles[cycles.length-1].push(users.splice(i,1)[0]);
            }
        }

        for (const c of cycles) {
            for (let i = 0; i < c.length; ++i) {
                const dm = await c[i].createDM();
                const recipient = c[i+1] ?? c[0];
                dm.send(`You'll get a present for: ${recipient} (${recipient.tag})`);
            }
        }

        let confirmation = 'The following people will take part:\n';
        for (const u of users) {
            confirmation += `${u}, `;
        }
        confirmation = confirmation.slice(0, -2);
        msg.channel.send(confirmation);
    });
}

export default handleSanta;
