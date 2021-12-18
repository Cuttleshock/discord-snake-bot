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

        let cycles: Array<Array<User>> = [];
        let attempts = 0;
        while (!validateSanta(cycles) && attempts < SANTA_MAX_ATTEMPTS) {
            cycles = [];
            const usersCopy = [...users];
            ++attempts;
            cycles.push([usersCopy[0]]);
            let i: number;

            while (usersCopy.length > 1) {
                if (usersCopy.length === 2) {
                    i = 1; // Match with only remaining person (should be able to combine w/ below)
                } else if (cycles[cycles.length-1].length === 1) {
                    i = Math.floor(Math.random()*(usersCopy.length-1)) + 1; // Don't match self
                } else {
                    i = Math.floor(Math.random()*usersCopy.length); // Match anybody, including self
                }
                if (i === 0) {
                    usersCopy.splice(i,1);
                    cycles.push([usersCopy[0]]);
                } else {
                    cycles[cycles.length-1].push(usersCopy.splice(i,1)[0]);
                }
            }
        }

        if (!validateSanta(cycles)) {
            msg.channel.send(`Couldn't get a valid configuration after ${SANTA_MAX_ATTEMPTS} tries :(`);
            return;
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

// The algorithm is CORRECT and PERFECT, so under normal conditions this could just return true.
// However, it allows us to add extra rules (e.g. if we don't want any pairs).
const invalidUserIdPair = [process.env.UNPAIRED_ID_1, process.env.UNPAIRED_ID_2];
function validateSanta(cycles: Array<Array<User>>): boolean {
    const userSet = new Set<User>([]);

    if (cycles.length === 0) { // Could check cycles.length <= 1 if _somebody_ doesn't like complete cycles
        return false;
    } else {
        for (const c of cycles) {
            for (const u of c) {
                if (userSet.has(u)) {
                    return false;
                } else {
                    userSet.add(u);
                }
            }
            if (c.length === 1) {
                return false;
            } else if (c.length === 2) {
                if (invalidUserIdPair.includes(c[0].id) && invalidUserIdPair.includes(c[1].id)) {
                    return false;
                }
            }
        }
    }

    return true;
}

export default handleSanta;
