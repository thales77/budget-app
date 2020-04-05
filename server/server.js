const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

//use files in /public directory
app.use(express.static(publicPath));

//route all requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

//start server on port assigned above
app.listen(port, () => {
    console.log('Server is up');
});