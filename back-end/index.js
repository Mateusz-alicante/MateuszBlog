const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

// require dependency files
require('dotenv').config()
require('./utils/db/init')

app.use(express.static(path.join(__dirname, '/../front-end/build')));
app.set('trust proxy', 1);


// Set up Routers
const ImageUploadRouter = require('./utils/routers/image-upload/Router')
app.use("/api/imageUpload",ImageUploadRouter)

const PostsRouter = require('./utils/routers/Posts/Posts')
app.use("/api/posts",PostsRouter)

app.get('/api/test', (req, res) => {
    console.log("Test request recieved")
    res.send('test path')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../front-end/build/index.html'));
});



// Liste on specified port
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
