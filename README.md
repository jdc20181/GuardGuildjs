
# GuardGuildjs
> ⚠️ Quick Disclaimer:
> AI Was used in the development of this package to support ESM and TypeScript. 
> While this is a very basic package, it takes the work out for you in an easy to understand API style adoption. 

GuardGuildjs is a simple utility for Discord bots. It helps you restrict commands to specific servers (guilds) or block them in DMs, so your bot only responds where you want it to.


## Installation

Install with npm:

```bash
npm install @jdc20181/guardguildjs
```


## Quick Start

### ESM Example

```js
import { blockIfWrongGuild } from 'guardguildjs';

export async function execute(interaction) {
  // Only allow this command in your main server, not in DMs
  const blocked = await blockIfWrongGuild(interaction, {
    scope: 'single',
    allowDM: false
  });
  if (blocked) return;
  await interaction.reply('Pong!');
}
```


### CommonJS Example

```js
const { blockIfWrongGuild } = require('guardguildjs');

module.exports = {
  data: { name: 'ping' },
  async execute(interaction) {
    // Only allow this command in your main server, not in DMs
    const blocked = await blockIfWrongGuild(interaction, {
      scope: 'single',
      allowDM: false
    });
    if (blocked) return;
    await interaction.reply('Pong!');
  }
};
```


### TypeScript Example

```ts
import { ChatInputCommandInteraction } from 'discord.js';
import { blockIfWrongGuild } from 'guardguildjs';

export async function execute(interaction: ChatInputCommandInteraction) {
  // Only allow this command in your main server, not in DMs
  const blocked = await blockIfWrongGuild(interaction, {
    scope: 'single',
    allowDM: false
  });
  if (blocked) return;
  await interaction.reply('Pong!');
}
```


## How It Works

Call `blockIfWrongGuild` at the top of your command. If it returns `true`, the command is blocked and a message is sent for you. If it returns `false`, you can continue with your command logic.

You can control which servers (guilds) are allowed, whether DMs are allowed, and more. See below for all options.

## API Reference

### `blockIfWrongGuild(interaction, options?, config?)`

Returns `true` if the command is blocked (and sends a reply for you). Returns `false` if the user is allowed and your command should continue.


**Options:**
- `scope`: Which guilds are allowed. Use `'single'` for one guild, `'all'` for a list, or provide an array of guild IDs.
- `allowDM`: Allow this command in DMs? (default: `true`)
- `message`: Custom message to show if blocked.
- `ownerOnly`: Only allow the bot owner to use this command? (default: `false`)
- `ownerBypassGuild`: Should the owner ignore guild restrictions? (default: `true`)
- `ownerBypassDM`: Should the owner ignore DM restrictions? (default: `true`)

**Config (optional):**
- `ownerId`: Override the owner user ID.
- `allowedGuildId`: Used when `scope: 'single'`.
- `allowedGuildIds`: Used when `scope: 'all'`.
- `env`: Use a custom environment object (defaults to `process.env`).


### `createGuard(defaultConfig)`
Create a guard function with your config baked in, so you don’t have to pass it every time.


### Utility Helpers

`getOwnerId(config?)`, `getAllowedGuilds(scope, config?)`, `isOwner(interaction, config?)`

These are available if you want more control or need to build custom logic.


## Environment Variables

You can set these in your `.env` or environment:
- `OWNER_ID`
- `ALLOWED_GUILD_ID`
- `ALLOWED_GUILD_IDS` (comma-separated)


## Example: Preconfigured Guard

If you want to reuse the same guard settings in multiple commands, you can create a guard function with your config:

**ESM**
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

**CommonJS**
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

**TypeScript**
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

Want a step-by-step guide? Check out [TUTORIAL.md](./TUTORIAL.md) for a quick setup walkthrough.


## Demo Bot

This repository also has a simple demo bot in the `demo-bot` folder. It comes with a `/ping` command and examples of different guard settings (just uncomment the one you want to try).

To try it out:

```bash
cd demo-bot
npm install
copy .env.example .env
npm start
```


## Publishing

To publish your own version:

```bash
npm install
npm run pack:check
npm publish --access public
```

# To Do

- User WL Support
- Database Support
- API/Oauth etc.

# License

MIT License. 