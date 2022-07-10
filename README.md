# FixAdvisor-BackEnd

- Óscar Moreira Estévez

## Requirements

- Node version 14
- Firebase account
- Firebase Store with this collections:
  - clients
  - providers
  - services
  - reviews

File `.env` with the following content about Firebase credentials:

```
API_KEY="********"
AUTH_DOMAIN="********"
PROJECT_ID="********"
STORAGE_BUCKET="********"
MESSAGING_SENDER_ID="********"
APP_ID="********"
```

In [firebasecongif.ts](./firebase/firebaseConfig.ts) file use this parth of the code:

```bash
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}
const defaultApp = initializeApp(firebaseConfig)
```

And then use this export:

```bash
export const authF = getAuth(defaultApp)
```

## Run in local

```bash
npm run dev
```