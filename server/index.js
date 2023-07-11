import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Question.js'
import answerRoutes from './routes/Answer.js'
import commentRoutes from './routes/Comments.js'
import subscriptionRoutes from './routes/Subscription.js'


import axios from 'axios'; 



const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());


app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/comment', commentRoutes)
app.use('/subscription',subscriptionRoutes)




app.get('/location', async (req, res) => {
    const { lat, lon } = req.query
    const url = `https://api.opencagedata.com/geocode/v1/json?key=65ddae864d014cc1bf8284b480357e47&q=${lat}%2C+${lon}&pretty=1&no_annotations=1`
    // let url = "https://api.opencagedata.com/geocode/v1/json?key=65ddae864d014cc1bf8284b480357e47&q=" + { lat } + "%2C+" + { lon } + "&pretty=1&no_annotations=1";
    const responce  = await axios.get(url)
        console.log(responce.data)
    // const data = geoRev.country(lat, lon);
    // const data = "Punjab, India";
    res.json({ data:responce.data})
})

const PORT = process.env.PORT || 5000
const CONNECTION_URL="mongodb+srv://2020eeb1362:Ankita23@cluster0.izfkukf.mongodb.net/?retryWrites=true&w=majority"

//const DATABASE_URL = process.env.CONNECTION_URL

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
