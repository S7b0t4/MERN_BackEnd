const {MongoClient} = require("mongodb")
const bodyParser = require('body-parser');

const client = new MongoClient("mongodb+srv://S7b0t4:JSFmd7LcVNgqyopw@cluster0.iocb1tr.mongodb.net/DB?retryWrites=true&w=majority")

const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json())


app.post('/userName', (req, res) => {
    const { data } = req.body;

    // Do something with the data (e.g., store it in a database)
    const userInfo = req.body.i
    console.log(userInfo);
    const start = async (user) =>{
        try{
            await client.connect()
            console.log("Connect to DB")
            const users = client.db().collection("users")
            await users.insertOne(user)
            const userInfo = await users.findOne({userName: user.userName})
            console.log(userInfo)
        }catch (e) {
            console.log(e)
        }
    }
    start(req.body.i)

    // Send a response
    res.status(200).json({ message: 'Data received successfully!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})