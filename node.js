const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (ensure you have MongoDB running)
mongoose.connect('mongodb://localhost:27017/codeSnippetsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
const codeSchema = new mongoose.Schema({
    title: String,
    language: String,
    code: String,
});

// Create a model
const CodeSnippet = mongoose.model('CodeSnippet', codeSchema);

// Handle code upload
app.post('/upload', (req, res) => {
    const newSnippet = new CodeSnippet({
        title: req.body.title,
        language: req.body.language,
        code: req.body.code,
    });
    newSnippet.save(() => {
        res.send('Code snippet uploaded successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
