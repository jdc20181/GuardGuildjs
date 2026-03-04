# Demo Bot

Basic Discord.js demo bot using `guardguildjs` with one `/ping` command.

## Setup

1. Install demo dependencies:

```bash
npm install discord.js dotenv
```

2. Copy env template and fill values:

```bash
copy .env.example .env
```

3. Run the demo bot:

```bash
node demo-bot/index.js
```

## Testing different guard levels

Open `demo-bot/commands/ping.js` and switch between the commented `blockIfWrongGuild(...)` blocks:

- `scope: 'single'`
- `scope: 'all'`
- `scope: ['id1', 'id2']`
- `ownerOnly: true`

You can also duplicate the command and register both to compare behavior side-by-side.
