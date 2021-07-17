const express=require('express');
const app=express();
const cors=require('cors');

const connectDB=require('./config/db');

app.use(cors());
app.use(express.json({extended:false}));

connectDB();

const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("API running");
})

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})