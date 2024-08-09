
const express =require('express');

//basciall a handler function
const app =express();

app.get('/',(req,res)=>
{
    return res.send("Hello from Home Page");
})

app.get('/about',(req,res)=>
    {
        return res.send("Hello from About Page"+" hey " + req.query.name +"you are "+ req.query.age);
    })


app.listen(8000, () =>console.log("Server Started"))