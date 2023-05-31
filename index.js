const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 9000 
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.tdolxqi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});

// middelware 
app.use(cors())
app.use(express.json())


async function run() {
  try {
    await client.connect();
    console.log('database running...')
    const database = client.db("startupproject");
    const dataCollection = database.collection("fkdata");

    app.get('/data',async(req,res)=>{
        const result = await dataCollection.find({}).toArray()
        res.send(result)
    })



  } finally {
    
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})