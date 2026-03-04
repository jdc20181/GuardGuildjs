function parseCsvList(value) {
  return String(value || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function parseEnvList(name, env = process.env) {
  return parseCsvList(env?.[name]);
}

function getOwnerId(config = {}) {
  const ownerId = config.ownerId ?? config.env?.OWNER_ID ?? process.env.OWNER_ID;
  return String(ownerId || '').trim() || null;
}

function isOwner(interaction, config = {}) {
  const ownerId = getOwnerId(config);
  if (!ownerId) return false;
  return String(interaction.user?.id) === ownerId;
}

function getAllowedGuilds(scope, config = {}) {
  if (!scope) return null;

  if (Array.isArray(scope)) {
    const list = scope.map(String).map(s => s.trim()).filter(Boolean);
    return list.length ? list : null;
  }

  const mode = String(scope).toLowerCase();
  const env = config.env || process.env;

  if (mode === 'single') {
    const single = String((config.allowedGuildId ?? env.ALLOWED_GUILD_ID) || '').trim();
    return single ? [single] : null;
  }

  if (mode === 'all') {
    const list = Array.isArray(config.allowedGuildIds)
      ? config.allowedGuildIds.map(String).map(s => s.trim()).filter(Boolean)
      : parseEnvList('ALLOWED_GUILD_IDS', env);
    return list.length ? list : null;
  }

  return null;
}

/**
 * Returns true if blocked (and replies for you).
 *
 * Options:
 * - scope: undefined | 'single' | 'all' | ['id1','id2']
 * - allowDM: default true
 * - ownerOnly: default false (if true, only OWNER_ID can run)
 * - ownerBypassGuild: default true (owner ignores guild restrictions)
 * - ownerBypassDM: default true (owner ignores allowDM=false)
 *
 * Config (optional 3rd argument):
 * - ownerId: string
 * - allowedGuildId: string
 * - allowedGuildIds: string[]
 * - env: object (custom env source)
 */
async function blockIfWrongGuild(
  interaction,
  { allowDM = true, message, scope, ownerOnly = false, ownerBypassGuild = true, ownerBypassDM = true } = {},
  config = {}
) {
  const owner = isOwner(interaction, config);

  if (ownerOnly && !owner) {
    await interaction.reply({ content: message || '❌ Only the bot owner can use this command.', ephemeral: true });
    return true;
  }

  const allowed = getAllowedGuilds(scope, config);
  if (!allowed) {
    if (!interaction.guildId && !allowDM && !(owner && ownerBypassDM)) {
      await interaction.reply({ content: message || '❌ This command must be used in a server.', ephemeral: true });
      return true;
    }
    return false;
  }

  if (!interaction.guildId) {
    if (allowDM) return false;
    if (owner && ownerBypassDM) return false;

    await interaction.reply({ content: message || '❌ This command must be used in a server.', ephemeral: true });
    return true;
  }

  if (!allowed.includes(interaction.guildId)) {
    if (owner && ownerBypassGuild) return false;

    await interaction.reply({ content: message || '❌ This command is not enabled in this server.', ephemeral: true });
    return true;
  }

  return false;
}

function createGuard(defaultConfig = {}) {
  return async function guard(interaction, options = {}) {
    return blockIfWrongGuild(interaction, options, defaultConfig);
  };
}

export {
  blockIfWrongGuild,
  createGuard,
  getOwnerId,
  getAllowedGuilds,
  isOwner
};
