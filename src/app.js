const express = require('express');
require("../src/db/conn");
const MenRanking = require("../src/models/mens");
const app = express();
const port = process.env.PORT||3000;
app.use(express.json());
app.get("/",async(req,res)=>{
    res.send("welcome to API");
});
app.post("/mens",async(req,res)=>{
    try{
        const addingMensRecords = new MenRanking(req.body);
        console.log(req.body);
      const insertsMen =  await addingMensRecords.save();
      res.status(201).send(insertsMen);
    }catch(e){
        res.status(404).send(e);
    }
});
app.get("/mens",async(req,res)=>{
    try{
        const getMens = await MenRanking.find({});

        res.status(201).send(getMens);
    }catch(e){
        res.status(400).send(e);
    }
});
app.get("/mens/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        console.log(_id);
        const getMen = await MenRanking.findById(_id);
        res.status(201).send(getMen);
    
    }catch(e){
        res.status(400).send(e);
    }
});
app.patch("/mens/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateMen = await MenRanking.findByIdAndUpdate(_id,req.body);
        res.status(201).send(updateMen);
    }catch(e){
        res.status(400).send(e);
    }
});
app.delete("/mens/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteMen = await MenRanking.findByIdAndDelete(_id);
        res.status(201).send(deleteMen);
    }catch(e){
        res.status(400).send(e);
    }
})
app.listen(port,()=>{
    console.log(`Connecting port number is:${port}`);
})