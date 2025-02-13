# Vacuum Cleaner AI Agent
- CHIYEMBEKEZO CHILEMBWE (BIT/21/SS/005)
- HARTSON LEBIUM DOVIKO (BIT/21/SS/009)

This repository demonstrates a basic vacuum cleaner robot designed to clean rooms. The simulation can be accessed at the following site: [Vacuum Robot AI](https://vacuum-robot-ai.vercel.app/). Below is a brief overview of the implementation for the tasks.

## Task 1
- The rooms in the environment randomize after every 5 cycles.
- The agent continues cleaning the rooms infinitely.
- The agent in this case is not rational because it continuously moves between rooms even if the other room is already clean.

## Task 2
- The rooms in the environment randomize after every cycle which is a multiple of 3.
- The agent continues cleaning the rooms infinitely.
- The agent in this case is not rational because it continuously moves between rooms even if the other rooms are already clean.

## Vacuum Robot Agent
The vacuum robot agent implementation can be located in the directory `app/VacuumRobotAgent.ts`. It utilizes basic if statements to check if the room is dirty or clean and is fed the data of the whole environment that needs to be cleaned, sequentially going through each room to clean them.

## Environments
- The environments are mainly contained in `Task1.tsx` and `Task2.tsx` as the frontend where the agent is utilized.

## Getting Started
Below is the setup for a local environment:

- Clone the repository.
- Run the commands listed below in the repository.

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
