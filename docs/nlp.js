const fs = require("fs");
const pdf = require("pdf-parse");
const nlp = require("compromise");

// Define categories and keywords
const categories = {
  Education: ["education", "school", "university", "student"],
  Sports: ["sports", "game", "olympian"],
  // ... more categories ...
};

async function extractTextFromPdf(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  return data.text;
}

/* function splitTextIntoSentences(text) {
  const doc = nlp(text);
  return doc.sentences().out("array");
}

function categorizeSentences(sentences) {
  const data = [];

  for (const sentence of sentences) {
    for (const [category, keywords] of Object.entries(categories)) {
      if (
        keywords.some((keyword) => sentence.toLowerCase().includes(keyword))
      ) {
        data.push({ text: sentence, category });
        break;
      }
    }
  }

  return data;
} */
function splitTextIntoSentences(text) {
  const doc = nlp(text);
  let sentences = doc.sentences().out("array");
  // Get all statements from the document
  const statements = doc.match("#Statement");

  // Print the statements
  console.log(statements);

  // Handle multi-line sentences: If a sentence ends with a comma or a full stop, append the next sentence to it
  for (let i = 0; i < sentences.length - 1; i++) {
    if (sentences[i].endsWith(",") || sentences[i].endsWith(".")) {
      sentences[i] += " " + sentences[i + 1];
      sentences.splice(i + 1, 1); // Remove the next sentence
      i--; // Re-check the current sentence
    }
  }

  return sentences;
}

function categorizeSentences(sentences) {
  const data = [];

  for (const sentence of sentences) {
    // Clean up the sentence: Remove trailing dots and numbers
    const cleanedSentence = sentence.replace(/[\.\d]+$/, "").trim();

    // Skip meaningless sentences: If the sentence is too short or doesn't contain any verbs, skip it
    if (
      cleanedSentence.split(" ").length < 3 ||
      !nlp(cleanedSentence).verbs().out("array").length
    ) {
      continue;
    }

    for (const [category, keywords] of Object.entries(categories)) {
      if (
        keywords.some((keyword) =>
          cleanedSentence.toLowerCase().includes(keyword)
        )
      ) {
        data.push({ text: cleanedSentence, category });
        break;
      }
    }
  }

  return data;
}

(async () => {
  const pdfPath = "./Congress-Manifesto-English-2024-Dyoxp_4E.pdf"; // Path to the PDF file
  const text = await extractTextFromPdf(pdfPath);
  const sentences = splitTextIntoSentences(text);
  const data = categorizeSentences(sentences);

  fs.writeFileSync("final.json", JSON.stringify(data));
})();
