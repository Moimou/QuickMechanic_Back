const express = require('express');
const app = express();
let port = process.env.PORT || 4000;


app.get("/", (req,res)=>{
    res.send("hello world")
})


app.listen(port, () =>{
    console.log(`Exemple app is listening on port http://localhost:${port}`);
})