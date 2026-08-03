# 🏬 Zantora — Multitenant E-commerce Platform

Zantora is a modern, open-source multitenant e-commerce platform built with the latest web technologies.  
Each shop runs on its own subdomain — perfect for SaaS e-commerce or marketplace platforms.

> ⚡️ Built for speed, scalability, and full customization.

---

## ✨ Features

- 🌐 **Multitenancy** with subdomain-based routing
- ⚙️ **PayloadCMS** headless CMS integration (MongoDB)
- ⚡ **tRPC + TypeScript** for full-stack type safety
- 🎨 **TailwindCSS + shadcn/ui** for beautiful, customizable UI
- 🚀 **Next.js 15 App Router** (Server Components, ISR, SSR)
- 📦 Fully typed API layer, ready for scaling

---

## 🧱 Tech Stack

| Tech            | Description                            |
|-----------------|----------------------------------------|
| **Next.js**     | React framework with App Router        |
| **PayloadCMS**  | Headless CMS with MongoDB              |
| **tRPC**        | Type-safe backend calls                |
| **TailwindCSS** | Utility-first CSS framework             |
| **shadcn/ui**   | Modern and clean UI components         |
| **TypeScript**  | Strongly typed codebase                |
| **MongoDB**     | NoSQL database                         |

---

## 📂 Project Structure
.
├── apps/
│ └── web/ # Frontend Next.js app
├── packages/
│ ├── config/ # Shared configuration (tsconfig, tailwind, etc.)
│ ├── db/ # PayloadCMS + MongoDB connection/config
│ └── ui/ # Shared UI components (e.g., buttons, inputs)
├── public/ # Static assets
├── .env.example # Example environment variables
├── README.md
└── package.json

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/ByUki-7/multitenant-ecommerce.git
cd multitenant-ecommerce

# 2. Install dependencies (Bun, npm, or pnpm)
bun install

# 3. Configure environment variables
cp .env.example .env
# Fill in your MongoDB URI and other secrets

# 4. Start the development server
bun run dev

```
--- 

🖌️ Design Philosophy
Zantora uses neobrutalism aesthetics: bold borders, strong colors, and minimalistic layout.
Every UI element is built with reusability and speed in mind — powered by shadcn/ui and TailwindCSS.


🤝 Contributing
Contributions, ideas and suggestions are welcome!
Feel free to fork the project and open a PR or an issue.


📄 License
This project is licensed under the MIT License.


🌐 Live Demo
https://multitenant-ecommerce-amber.vercel.app

Made with ❤️ by @ByUki-7 from Codewithantonio's tutorial <3
