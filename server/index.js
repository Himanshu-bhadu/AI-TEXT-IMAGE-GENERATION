import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postroutes from './routes/postroutes.js';
import imageroutes from './routes/imageroutes.js';

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postroutes);
app.use('/api/v1/image',imageroutes);

app.get('/',async(req,res)=>{
    res.send("hello lele dalle");
})



const startserver=async()=>{

    try{
        connectDB(process.env.MONGODB_URL);
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
            });

    }
    catch(error){
        console.log(error)
    }
    
}

startserver();