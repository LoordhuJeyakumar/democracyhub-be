const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync(
  "./docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf"
);

pdf(dataBuffer)
  .then(function (data) {
    // The extracted text is in data.text
    console.log(data.text);
    // Save the extracted text to a file for further processing
    fs.writeFileSync("extractedText.txt", data.text);
  })
  .catch((error) => {
    console.error("Error extracting text from PDF: ", error);
  });
