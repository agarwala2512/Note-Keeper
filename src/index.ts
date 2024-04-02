import express, { Express } from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import notesRoutes from './routes/notes';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

//connection to mongoDB
connectDB();

//middleware
app.use(bodyParser.json());
app.use('/notes', notesRoutes);


app.listen(PORT, () => {
    console.log(`Server is running fine on port : ${PORT} `);
});