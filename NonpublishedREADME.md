# GuardGuildjs

A tiny helper for Discord bots that blocks command usage in the wrong guild or DM context.

## Install

```bash
npm install @jdc20181/guardguildjs
```

## Quick Start (ESM)

```js
import { blockIfWrongGuild } from 'guardguildjs';

export async function execute(interaction) {
  const blocked = await blockIfWrongGuild(interaction, {
    scope: 'single',
    allowDM: false
  });

  if (blocked) return;

  await interaction.reply('Pong!');
}
```

## Quick Start (CommonJS)

```js
const { blockIfWrongGuild } = require('guardguildjs');

module.exports = {
  data: { name: 'ping' },
  async execute(interaction) {
    const blocked = await blockIfWrongGuild(interaction, {
      scope: 'single',
      allowDM: false
    });

    if (blocked) return;

    await interaction.reply('Pong!');
  }
};
```

## Quick Start (TypeScript)

```ts
import { ChatInputCommandInteraction } from 'discord.js';
import { blockIfWrongGuild } from 'guardguildjs';

export async function execute(interaction: ChatInputCommandInteraction) {
  const blocked = await blockIfWrongGuild(interaction, {
    scope: 'single',
    allowDM: false
  });

  if (blocked) return;

  await interaction.reply('Pong!');
}
```

## API

### `blockIfWrongGuild(interaction, options?, config?)`
Returns `true` if the interaction is blocked (and replies for you). Returns `false` if execution should continue.

**Options**
- `scope`: `undefined | 'single' | 'all' | string[]`
- `allowDM`: default `true`
- `message`: custom denial message
- `ownerOnly`: default `false`
- `ownerBypassGuild`: default `true`
- `ownerBypassDM`: default `true`

**Config (optional)**
- `ownerId`: owner user id override
- `allowedGuildId`: used when `scope: 'single'`
- `allowedGuildIds`: used when `scope: 'all'`
- `env`: custom env object override (defaults to `process.env`)

### `createGuard(defaultConfig)`
Creates a preconfigured guard function so you don’t pass `config` every time.

### `getOwnerId(config?)`, `getAllowedGuilds(scope, config?)`, `isOwner(interaction, config?)`
Utility helpers exported for advanced usage.

## Environment Variables (default mode)
- `OWNER_ID`
- `ALLOWED_GUILD_ID`
- `ALLOWED_GUILD_IDS` (comma-separated)

## Example with Preconfigured Guard

### ESM

```js
import { createGuard } from 'guardguildjs';

const guard = createGuard({
  ownerId: process.env.OWNER_ID,
  allowedGuildIds: ['123456789012345678', '987654321098765432']
});

export async function execute(interaction) {
  if (await guard(interaction, { scope: 'all', allowDM: false })) return;

  await interaction.reply('Allowed.');
}
```

### CommonJS

```js
const { createGuard } = require('guardguildjs');

const guard = createGuard({
  ownerId: process.env.OWNER_ID,
  allowedGuildIds: ['123456789012345678', '987654321098765432']
});

async function execute(interaction) {
  if (await guard(interaction, { scope: 'all', allowDM: false })) return;

  await interaction.reply('Allowed.');
}
```

### TypeScript

```ts
import { ChatInputCommandInteraction } from 'discord.js';
import { createGuard } from 'guardguildjs';

const guard = createGuard({
  ownerId: process.env.OWNER_ID,
  allowedGuildIds: ['123456789012345678', '987654321098765432']
});

export async function execute(interaction: ChatInputCommandInteraction) {
  if (await guard(interaction, { scope: 'all', allowDM: false })) return;

  await interaction.reply('Allowed.');
}
```

## Tutorial
See [TUTORIAL.md](./TUTORIAL.md) for a small guided setup.

## Demo Bot

A minimal demo bot is included in [`demo-bot`](./demo-bot/README.md) with one `/ping` command.

The command file includes commented guard modes so users can quickly test different levels:
- `scope: 'single'`
- `scope: 'all'`
- `scope: ['guild1', 'guild2']`
- `ownerOnly: true`

To run the demo:

```bash
cd demo-bot
npm install
copy .env.example .env
npm start
```

## Publish Checklist

```bash
npm install
npm run pack:check
npm publish --access public
```


