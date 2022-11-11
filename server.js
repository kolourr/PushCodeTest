const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs');
const PORT = 3000

app.use(express.static('public'))
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3000/'],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true
}))

//Express
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, parameterLimit: 50000, limit: '50mb'}));

//Home Route
app.get('/', (req, res) => {
     res.sendFile(__dirname + '/index.html')
})

//JSON File Route
app.get('/apertureLabsClocks.json', (req, res) => {
    res.sendFile(__dirname + '/apertureLabsClocks.json')
})


//Create New JSON FILE
app.post('/createjson', async (req, res) => {

  let newJSONFile = req.body.updatedJSON
  fs.writeFile("labour_hours.json", newJSONFile, function(err, result) {
        if(err) console.log('error', err)
    })

})

//Display New JSON
app.get('/labourhours', (req, res) => {
  res.sendFile(__dirname + '/labour_hours.json')
})

//PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})