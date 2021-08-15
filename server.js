const express=require('express');
const app=express();
const cors=require('cors');
const path=require('path');

const connectDB=require('./config/db');

app.use(cors());
app.use(express.json({extended:false}));

connectDB();

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));
//serve static assets in production
if(process.env.NODE_ENV==='production'){
    // set the static folder
    app.use(express.static('frontend/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})