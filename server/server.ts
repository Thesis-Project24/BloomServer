import express from 'express'
import cors from 'cors'
import userRouter from './modules/users/userRoute'
import doctorRouter from './modules/doctors/doctorRoute'
import medsRouter from './modules/meds/medsRoute'
import habitsRouter from './modules/habits/habitsRoute'
import journalRouter from './modules/journal/journalRoute'
import articleRouter from './modules/articles/articlesRoute'
import forumPostRouter from './modules/forum/posts/postsRoute'
import forumCommentRouter from './modules/forum/comments/commentsRoute'
import forumFlairRouter from './modules/forum/flairs/flairsRoute'
import appointmentRouter from './modules/appointments/appointments/appointmentsRoute'
import slotRouter from './modules/appointments/slots/slotsRoute'
import windowRouter from './modules/appointments/windows/windowsRoute'
import http from "http";
import { Server } from "socket.io";


const app = express();
const port =3000;
app.use(cors())
app.use(express.json())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


app.use('/users',userRouter)
app.use('/meds/',medsRouter)
app.use('/habits',habitsRouter)
app.use('/doctors',doctorRouter)
app.use('/articles',articleRouter)
app.use('/journals',journalRouter)
app.use('/forum/posts',forumPostRouter)
app.use('/appointment/slots',slotRouter)
app.use('/forum/flairs',forumFlairRouter)
app.use('/appointment/windows',windowRouter)
app.use('/forum/comments',forumCommentRouter)
app.use('/appointemnt/appointments',appointmentRouter)

app.get("/",(req,res)=>{
  res.send("helllo")
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

