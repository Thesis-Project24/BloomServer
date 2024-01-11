import express from 'express'
import cors from 'cors'
import userRouter from './modules/users/userRoute'
import doctorRouter from './modules/doctors/doctorRoute'
import medsRouter from './modules/meds/medsRoute'
import habitsRouter from './modules/habits/habitsRoute'
import journalRouter from './modules/journal/journalRoute'
import articleRouter from './modules/articles/articlesRoute'
import forumPostRouter from './modules/forum/posts/postsRoute'
import forumCommentRouter from './modules/forum/comments/commentRoute'
import forumFlairRouter from './modules/forum/flairs/flairsRoute'
import appointmentRouter from './modules/appointments/appointments/appointmentsRoute'
import slotRouter from './modules/appointments/slots/slotsRoute'
import windowRouter from './modules/appointments/windows/windowsRoute'

const app = express()


const port =3000;
app.use(cors())
app.use(express.json())

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});