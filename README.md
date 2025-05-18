# Admin Console

Mini projet d'administration des utilisateurs, applications et permissions.

## 🛠 Stack utilisée

- **Frontend** : React + Vite + TypeScript + shadcn/ui
- **Backend** : NestJS + Prisma
- **Base de données** : SQLite 
- **Tests E2E** : Cypress

## 🚀 Installation et lancement

### Backend

cd backend
npm install
npx prisma migrate dev
npm run start:dev

### Front-end

cd frontend
npm install
npm run dev

### test

npx cypress open
