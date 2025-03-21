# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Setup
Please ensure nodejs is installed following the link [nodejs](https://nodejs.org/en). If you already have nodejs installed, you can go ahead to start the front-end server by using the following command

Download Libraries

```bash
npm install
```

And run front-end server. The following command will run the command in development mode, and it will use the `.env.development` or `.env`.

```bash
npm run dev
```

To run in production and use `.env.production` will have to use the following commands

```bash
npm run build
npm run preview
```

>[!NOTE]
>Please find the environment files and modify as you see fit.
> 1. `.env`
> 2. `.env.development`
> However, you will have to create the production environment when deploying the website `.env.production`.

To run the server at a specific port and expose it, use the following command:

```bash
npm run dev -- --host --port 3000
```

This will ensure it exposes port 3000. If any port is specified after that flag, it will use the specified port instead.
