import express from 'express';
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

import { log } from 'console';



app.get('/',(req,res,next)=>{
   return res.send('server is working');
});

app.listen(8888,"localhost",()=>{
        console.log("in app ts");
        console.log(`server is running on http://localhost:8888`)
});