const express = require('express');
const path = require('path');
const UploadPage = require('./UploadPage');
const AnalysisPage = require('./AnalysisPage');


const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/upload', UploadPage);
app.use('/analysis', AnalysisPage);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
