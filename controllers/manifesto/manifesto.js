const fs = require("fs");
const pdfParse = require("pdf-parse");
const natural = require("natural");
const sw = require("stopword");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

let filePathManifeto1 = "../docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf";
let filePathManifeto2 = "../docs/Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf";

const getTextDatafromPdf = async (filePath) => {
  let dataBuffer = fs.readFileSync(filePath);

  let data = await pdfParse(dataBuffer);

  return data.text;
};

const textPreprocessing = async () => {
  let manifesto1 = await getTextDatafromPdf(filePathManifeto1);
  let manifesto2 = await getTextDatafromPdf(filePathManifeto2);

  // Lowercasing
  manifesto1 = manifesto1.toLowerCase();
  manifesto2 = manifesto2.toLowerCase();

  // Removing punctuation
  manifesto1 = manifesto1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  manifesto2 = manifesto2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  // Removing stopwords
  let textArray1 = manifesto1.split(" ");
  textArray1 = sw.removeStopwords(textArray1);
  manifesto1 = textArray1.join(" ");

  let textArray2 = manifesto2.split(" ");
  textArray2 = sw.removeStopwords(textArray2);
  manifesto2 = textArray2.join(" ");

  // Stemming
  let stemmer1 = natural.PorterStemmer;
  manifesto1 = stemmer1.stem(manifesto1);
  let stemmer2 = natural.PorterStemmer;
  manifesto2 = stemmer2.stem(manifesto2);

  return { manifesto1, manifesto2 };
};
const mainFunction = async () => {
  let { manifesto1, manifesto2 } = await textPreprocessing();
  tfidf.addDocument(manifesto1);
  tfidf.addDocument(manifesto2);

  let topWords1 = tfidf.listTerms(0).slice(0, 10); // get the top 10 words for document 0
  let topWords2 = tfidf.listTerms(1).slice(0, 10); // get the top 10 words for document 1

  function dotProduct(vecA, vecB) {
    let product = 0;
    for (let i = 0; i < vecA.length; i++) {
      product += vecA[i] * vecB[i];
    }
    return product;
  }

  function magnitude(vec) {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
      sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
  }

  function cosineSimilarity(vecA, vecB) {
    return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
  }

  // Get the list of terms in both documents
  let terms1 = tfidf.listTerms(0);
  let terms2 = tfidf.listTerms(1);

  // Combine the terms from both documents and remove duplicates
  let terms = [
    ...new Set([
      ...terms1.map((term) => term.term),
      ...terms2.map((term) => term.term),
    ]),
  ];

  // Create TF-IDF vectors for both documents
  let tfidfVec1 = terms.map((term) => {
    let entry = terms1.find((t) => t.term === term);
    return entry ? entry.tfidf : 0;
  });

  let tfidfVec2 = terms.map((term) => {
    let entry = terms2.find((t) => t.term === term);
    return entry ? entry.tfidf : 0;
  });

  console.log("Cosine Similarity:", cosineSimilarity(tfidfVec1, tfidfVec2));
};
mainFunction();
