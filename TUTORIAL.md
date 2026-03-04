# GuardGuildjs Tutorial

This is a fast 5-minute setup.

## 1) Install

```bash
npm install guardguildjs
```

## 2) Set env values (optional)

Create/update your `.env`:

```env
OWNER_ID=123456789012345678
ALLOWED_GUILD_ID=123456789012345678
ALLOWED_GUILD_IDS=123456789012345678,987654321098765432
```

## 3) Protect one command

```js
const { blockIfWrongGuild } = require('guardguildjs');

module.exports = {
  data: { name: 'secure-command' },
  async execute(interaction) {
    const blocked = await blockIfWrongGuild(interaction, {
      scope: 'single',
      allowDM: false,
      message: '❌ This command is restricted.'
    });

    if (blocked) return;

    await interaction.reply('✅ You are allowed.');
  }
};
```

## 4) Reuse guard everywhere (recommended)

```js
const { createGuard } = require('guardguildjs');

const guard = createGuard({
  ownerId: process.env.OWNER_ID,
  allowedGuildIds: ['123456789012345678', '987654321098765432']
});

async function run(interaction) {
  if (await guard(interaction, { scope: 'all', allowDM: false })) return;
  await interaction.reply('✅ Access granted.');
}
```

## 5) Publish your package

From the package folder:

```bash
npm login
npm run pack:check
npm publish --access public
```

If your package name already exists, update the `name` in `package.json` (or use a scoped name like `@yourname/guardguildjs`).

## 6) Run included demo bot

Install demo dependencies:

```bash
cd demo-bot
npm install
```

Create your demo env file:

```bash
copy .env.example .env
```

Start the demo bot:

```bash
npm start
```

Now open `demo-bot/commands/ping.js` and switch between the commented guard examples to test each level.
