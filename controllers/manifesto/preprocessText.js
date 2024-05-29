const fs = require("fs");
const natural = require("natural");

// Load text data from files
const manifestoText1 = fs.readFileSync("../docs/ManifestoBjp_1.txt", "utf-8");
const manifestoText2 = fs.readFileSync(
  "../docs/ManifestoCongress_1.txt",
  "utf-8"
);

const preprocessText = (text) => {
  // Tokenization
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);

  // Stop Words Removal
  const stopWords = natural.stopwords;
  const filteredTokens = tokens.filter(
    (token) => !stopWords.includes(token.toLowerCase())
  );

  // Stemming
  const stemmer = natural.PorterStemmer;
  const stemmedTokens = filteredTokens.map((token) => stemmer.stem(token));

  return stemmedTokens;
};

const preprocessedText1 = preprocessText(manifestoText1);
const preprocessedText2 = preprocessText(manifestoText2);

// Save preprocessed text to files
fs.writeFileSync(
  "../docs/preprocessedText1.json",
  JSON.stringify(preprocessedText1)
);
fs.writeFileSync(
  "../docs/preprocessedText2.json",
  JSON.stringify(preprocessedText2)
);

console.log("Preprocessing complete");
