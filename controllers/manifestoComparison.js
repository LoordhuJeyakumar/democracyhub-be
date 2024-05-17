const pdf = require("pdf-parse");
const fs = require("fs");
const natural = require("natural");
const tokenizer = new natural.SentenceTokenizer();
const tfidf = new natural.TfIdf();
const classifier = new natural.BayesClassifier();

async function convertPDFToText(pdfBuffer) {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (err) {
    console.error("Error converting PDF to text:", err);
    return null;
  }
}

const pdfBuffer = fs.readFileSync(
  "../docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf"
);

async function getTextDatafromPdf(pdfBuffer) {
  try {
    let textData = await convertPDFToText(pdfBuffer);
    return textData;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function main() {
  let manifestoText = await getTextDatafromPdf(pdfBuffer);

  function preprocessText(text) {
    // Remove line breaks, extra whitespace, and unwanted characters
    let cleanedText = text
      .replace(/\r?\n|\r/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    cleanedText = cleanedText.replace(/[^a-zA-Z0-9\s]/g, "");

    return cleanedText;
  }

  const preprocessedManifestoText = preprocessText(manifestoText);

  /*  const sentences = tokenizer.tokenize(preprocessedManifestoText);
  const tfidfVectors = tfidf.tfidf(sentences); */

  // Define categories and their associated keywords or phrases
  const categoryKeywords = {
    healthcare: [
      "healthcare",
      "medical",
      "hospital",
      "doctors",
      "patients",
      "medicine",
    ],
    education: [
      "education",
      "school",
      "teacher",
      "students",
      "learning",
      "college",
    ],
    infrastructure: [
      "infrastructure",
      "road",
      "transportation",
      "bridge",
      "development",
      "urban",
    ],
  };

  // Initialize an object to store segmented text for each category
  const segmentedText = {};

  // Tokenize the manifesto text
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(preprocessedManifestoText);

  // Classify each token into categories based on keywords
  tokens.forEach((token) => {
    for (const category in categoryKeywords) {
      if (
        categoryKeywords[category].some((keyword) =>
          preprocessText(token).includes(keyword)
        )
      ) {
        if (!segmentedText[category]) {
          segmentedText[category] = [];
        }
        segmentedText[category].push(token);
        break; // Break out of loop once a category match is found
      }
    }
  });

  // Display segmented text for each category
  console.log(segmentedText);
}

main();
