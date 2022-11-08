const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

async function run(){
    try{

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