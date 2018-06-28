const app=require('express')();
const cors=require('cors');
const bodyParser=require('body-parser');
const {MongoClient, ObjectID}=require('mongodb');
const port=3000;
var db;
var err;

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017',(error,client)=>{
    if(error){
      err=error;
      return;
    }
    db=client.db('CRUD');
})

app.get('/',(req,res)=>{
    res.send('Server up and running in port..');
})

app.get('/getProduct',(req,res)=>{
    db.collection('operation').find({}).toArray((err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})

app.post('/postProduct',(req,res)=>{
    const body=req.body;
    db.collection('operation').insert(body,(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})

app.delete('/deleteProduct/:id',(req,res)=>{
    const id=req.params.id;
    db.collection('operation').deleteOne({_id:new ObjectID(id)},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})

app.patch('/updateProduct',(req,res)=>{
    const body=req.body;
    db.collection('operation').updateOne(
        {_id:new ObjectID(body.id)},
        {$set:{
            name:body.name,
            age:body.age,
            domain:body.domain
        }},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})

app.listen(port,()=>{
    console.log(`Server running in port ${port}...`)
})