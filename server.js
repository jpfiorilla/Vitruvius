const fs = require('fs');
const request = require('rp');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const readdir = require('fs-readdir-promise');

// let deviceDomain = '',
//     port = 0,
//     version = 0;

// const serverUri = `http://${deviceDomain}:${port}/sdk/${version}/resources`;

// fs.readdirSync('/Volumes/Public', (err, files) => console.log(err || files.join('\n')));
// readdir('/Volumes/Public').then(files => console.log(files.join(', ')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// app.use('/api', update);

app.get('/download/:fileName', (req, res) => {
    // console.log(req.params.fileName)
    let { fileName } = req.params;
    readdir('/Volumes/Public').then(files => {
        console.log(__dirname)
        if (files.includes(req.params.fileName)){
            res.download(__dirname + '/' + req.params.fileName);
        }
    }).catch(err => console.error(err))
})

app.get('*', function (req, res) {
    res.sendFile( process.env.PWD + "/index.html" );
});

const server = app.listen(process.env.PORT || 8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})