const fs = require("fs");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

// Read the extracted text from the file
let text = fs.readFileSync("extractedText.txt", "utf-8");

// Tokenize the text
let tokens = tokenizer.tokenize(text);
console.log(tokens);

// Save the tokens to a file for further processing
fs.writeFileSync("tokens.json", JSON.stringify(tokens));
