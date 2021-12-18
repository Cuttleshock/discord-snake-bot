import { Command } from '@types';

const handleDebug: Command = async ({ msg }) => {
    const members = msg.mentions.members;
    for (const m of members.values()) {
        const user = await m.user.fetch();
        console.log(`${user.tag}: ${user.id}`);
    }
}

export default handleDebug;
