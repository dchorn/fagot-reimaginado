'use strict'  
const express = require('express')  
const app=express()  
const port =process.env.PORT || 3000  
app.listen(port, ()=>{  
console.log(`Aquesta és la nostra API-REST que corre en http://localhost:${port}`)  
})
