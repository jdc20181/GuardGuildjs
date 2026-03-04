import { SlashCommandBuilder } from 'discord.js';
import { blockIfWrongGuild } from '../../guardGuild.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('GuardGuildjs demo command.');

export async function execute(interaction) {
  // Pick ONE guard mode below and comment out the others.

  // 1) Single guild mode (uses ALLOWED_GUILD_ID)
  const blocked = await blockIfWrongGuild(interaction, {
    scope: 'single',
    allowDM: false,
    message: '❌ Ping is locked to one guild right now.'
  });

  // 2) Multi guild mode (uses ALLOWED_GUILD_IDS)
  // const blocked = await blockIfWrongGuild(interaction, {
  //   scope: 'all',
  //   allowDM: false,
  //   message: '❌ Ping is only enabled in approved guilds.'
  // });

  // 3) Manual guild list mode (hard-code IDs in command)
  // const blocked = await blockIfWrongGuild(interaction, {
  //   scope: ['123456789012345678', '987654321098765432'],
  //   allowDM: false,
  //   message: '❌ Ping is not enabled in this guild.'
  // });

  // 4) Owner-only mode
  // const blocked = await blockIfWrongGuild(interaction, {
  //   ownerOnly: true,
  //   message: '❌ Only the owner can run this ping.'
  // });

  // Tip: copy this file to another command (for example ping2.js)
  // and test a different mode side-by-side.

  if (blocked) return;

  await interaction.reply('🏓 Pong! Guard check passed.');
}
