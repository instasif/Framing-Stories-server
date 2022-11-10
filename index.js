const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2lbo3hl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serveiceCollection = client.db("framingStories").collection("services");

        app.get('/services', async(req, res) =>{
            const query = {};
            const cursor = serveiceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        app.get('/services/:id', async(req, res) =>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serveiceCollection.findOne(query);
            res.send(service);
        })
    }
    finally{

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) =>{
    res.send(`server is running on port: ${port}`)
});
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})