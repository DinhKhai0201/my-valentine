# MY VALENTINE

## Demo
![image](docs/demo.gif)
## Preview site:  https://my-valentinee.vercel.app/

## Getting Started

First, set up Telegram bot to receive notification:
- Create a new Telegram bot, obtain its key, and place it in `NEXT_PUBLIC_TELEGRAM_BOT_KEY` in `.env`.
- Create a new Telegram group to receive notifications from the bot.
- Add your Telegram bot to the group.
- Obtain the group ID and place it in `NEXT_PUBLIC_TELEGRAM_CHAT_ID` in `.env`.

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
