const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.use(express.static(path.join(__dirname, '/../front-end/build')));
app.set('trust proxy', 1);


app.get('/api/test', (req, res) => {
    console.log("Test request recieved")
    res.send('test path')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../front-end/build/index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
