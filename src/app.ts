const express = require('express');
import db from './db/db';
import route from './routes/index';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
const cors = require('cors');
const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'http://localhost:3001',
      'https://app-chat-vch.herokuapp.com',
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:4200',
      'http://localhost:3001',
      'https://app-chat-vch.herokuapp.com',
    ],
  },
});

db();

httpServer.listen(port, () => {
  console.log(`Server listen at port ${port}`);
});

route(app);
