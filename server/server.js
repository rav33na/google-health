const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const upload = multer({dest: "./uploads/"});
const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');
const PORT = 8080;

const client1 = new textToSpeech.TextToSpeechClient({
  keyFilename: './API_KEY.json'
});

app.use(express.static("./audio"));
app.use(cors());
app.use(express.json());

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: './API_KEY.json'
});

// app.use(express.static("./uploads"));
app.post("/uploadFile",upload.single("image"), (req, res) => {
  let fileType = req.file.mimetype.split("/")[1];
  let newFileName = req.file.filename + "." + fileType;
  fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, () => {
  console.log("callback");
  client
  .textDetection(`./uploads/${newFileName}`)
  .then(results => {
    const data = results[0].textAnnotations;
    console.log('text', data[0].description);
        
    writeData(data[0].description);
    res.send(data[0].description)
  })
  .catch(err => {
    console.error('ERROR:', err);
  });})
  
});
app.get("/audio", (req, res) => {
async function quickStart() {
  // The text to synthesize
  const infoData = readData();
  const text = infoData;
  // Construct the request
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  };
  // Performs the text-to-speech request
  const [response] = await client1.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('./audio/output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');

}
quickStart();
res.send("http://localhost:8080/output.mp3")
})


function readData() {
    const data = fs.readFileSync("./data.json");
    return JSON.parse(data);
}
function writeData(newData) {
      fs.writeFileSync("./data.json", JSON.stringify(newData));
    return newData;
}

app.get("/", (req, res) =>
    res.json(readData()))

app.get("/audio", (req, res) => {
  res.send("output.mp3")
})

app.listen(PORT, () => console.log(`Server running at ${8080}`)