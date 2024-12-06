# Real Time Chat App | JWT, Socket.io

![Screenshot 2024-12-06 at 12 31 Background Removed 07 PM](https://github.com/user-attachments/assets/f3d14802-174b-47ef-95d0-94485f4406ab)

Some Features:

-   Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
-   Authentication && Authorization with JWT
-   Real-time messaging with Socket.io
-   Online user status (Socket.io and React Context)
-   Global state management with Zustand
-   Error handling both on the server and on the client

### Setup .env file

```js
PORT=3001
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

### Start the frontend

```shell
cd frontend
npm install
npm run dev
```

### Start the Backend

```shell
cd ../backend
npm install
node server.js
```

Now visit <http://localhost:3000/> to use the app.
