# Chatapp

Une application de chat en temps réel, idéale pour discuter avec ses amis sur un réseau local

## Prérequis

- Node.js v18 ou supérieur
- npm

## Installation du projet

```bash
git clone https://github.com/Codebarou/chat-app.git
cd chat-app
npm install
```

## Utilisation du projet

1. Démarrer le serveur
```bash
npm run start
```

Le serveur sera lancé avec **nodemon**, qui va automatiquement redémarrer l'application lors d'une modification

2. Ouvrir le projet dans un navigateur
```
Navigateur ---> localhost:3000
```

## La structure du projet 

```
.
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   └── styles.css
├── README.md
├── server.js
├── src
│   └── styles.css
└── tailwind.config.js
```

## Technologies utilisées

- Node.js
- Jquery
- Express
- Socket.io
- Tailwindcss