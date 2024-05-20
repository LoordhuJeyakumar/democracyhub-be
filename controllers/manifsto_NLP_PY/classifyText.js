/* const { exec } = require("child_process");
const fs = require("fs");

// Read the preprocessed tokens from the file
let tokens = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

// Combine tokens into a single string (adjust this as necessary)
let textToClassify = tokens.join(" ");

// Write the text to a temporary file
fs.writeFileSync("temp.txt", textToClassify);

// Call the Python script to classify the text
exec(`python classifier.py temp.txt`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  try {
    let results = JSON.parse(stdout);
    console.log("classifiedResults Processing");
    console.log(results);

    // Save the classification results to a file
    fs.writeFileSync("classifiedResults.json", JSON.stringify(results));
  } catch (error) {
    console.error(`Error parsing Python script output: ${error}`);
  }
});
 */
/* 
const { exec } = require("child_process");
const fs = require("fs");

// Read the preprocessed tokens from the file
let tokens = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

// Combine tokens into a single string (adjust this as necessary)
let textToClassify = tokens.join(" ");

// Function to split text into chunks
function splitTextIntoChunks(text, maxWords) {
  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }
  return chunks;
}

// Split the text into manageable chunks
const textChunks = splitTextIntoChunks(textToClassify, 500); // Adjust chunk size as necessary

// Process each chunk individually
textChunks.forEach((chunk, index) => {
  // Write each chunk to a temporary file
  const tempFileName = `temp_chunk_${index}.txt`;
  fs.writeFileSync(tempFileName, chunk);

  // Call the Python script to classify each chunk
  exec(`python classifier.py ${tempFileName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    try {
      let results = JSON.parse(stdout);
      console.log(`classifiedResults for chunk ${index} Processing`);
      console.log(results);

      // Save the classification results to a file
      const resultFileName = `classifiedResults_chunk_${index}.json`;
      fs.writeFileSync(resultFileName, JSON.stringify(results));
    } catch (error) {
      console.error(`Error parsing Python script output: ${error}`);
    }
  });
});
 */
const { exec } = require("child_process");
const fs = require("fs");
const async = require("async");

// Read the preprocessed tokens from the file
let tokens = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

// Combine tokens into a single string (adjust this as necessary)
let textToClassify = tokens.join(" ");

// Function to split text into chunks
function splitTextIntoChunks(text, maxWords) {
  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }
  return chunks;
}

// Split the text into manageable chunks
const textChunks = splitTextIntoChunks(textToClassify, 500); // Adjust chunk size as necessary

// Function to process each chunk
function processChunk(chunk, index, callback) {
  const tempFileName = `temp_chunk_${index}.txt`;
  fs.writeFileSync(tempFileName, chunk);

  exec(`python classifier.py ${tempFileName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      callback(error);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    try {
      let results = JSON.parse(stdout);
      console.log(`classifiedResults for chunk ${index} Processing`);
      console.log(results);

      // Save the classification results to a file
      const resultFileName = `classifiedResults_chunk_${index}.json`;
      fs.writeFileSync(resultFileName, JSON.stringify(results));
      callback(null, results);
    } catch (error) {
      console.error(`Error parsing Python script output: ${error}`);
      callback(error);
    }
  });
}

// Process all chunks in parallel
async.mapLimit(textChunks, 5, processChunk, (err, results) => {
  if (err) {
    console.error("Error processing chunks:", err);
    return;
  }
  console.log("All chunks processed successfully.");
});



let output = {
  partynames:["ICN","BJP"],
  manifesto:{
    categories:{
      education:{
        statement:""
      }
    },
  }

}