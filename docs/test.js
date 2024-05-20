const fs = require("fs");
const pdf = require("pdf-parse");
const natural = require("natural");
const categories = require("../controllers/categories");
const nlp = require("compromise"); // You need to install this library

const tokenizer = new natural.WordTokenizer();

function preprocessText(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.join(" ");
}

async function extractTextFromPdf(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  return data.text;
}

function splitTextIntoSentences(text) {
  const doc = nlp(text);
  return doc.sentences().out("array");
}

function categorizeText(text) {
  const sentences = splitTextIntoSentences(text);
  const categorized = {};

  for (const sentence of sentences) {
    const lowerCaseSentence = sentence.toLowerCase();
    let categorizedFlag = false;
    for (const [category, keywords] of Object.entries(categories)) {
      if (
        keywords.some((keyword) =>
          lowerCaseSentence.includes(keyword.toLowerCase())
        )
      ) {
        if (!categorized[category]) {
          categorized[category] = [];
        }
        categorized[category].push(sentence);
        categorizedFlag = true;
        break;
      }
    }
  }
  return categorized;
}

function compareCategories(categorized1, categorized2) {
  const comparison = [];

  for (const category of Object.keys(categories)) {
    const party1Statements = categorized1[category] || [];
    const party2Statements = categorized2[category] || [];
    comparison.push({
      category,
      party1HasStatement: party1Statements.length > 0,
      party2HasStatement: party2Statements.length > 0,
      party1Statements,
      party2Statements,
    });
  }

  return comparison;
}

function generateReport(comparisons) {
  const formattedComparisons = comparisons.map((comparison) => {
    return {
      category: comparison.category,
      party1HasStatement: comparison.party1HasStatement,
      party1Statements:
        comparison.party1Statements.length > 0
          ? mergeRedundantStatements(comparison.party1Statements)
          : [],
      party2HasStatement: comparison.party2HasStatement,
      party2Statements:
        comparison.party2Statements.length > 0
          ? mergeRedundantStatements(comparison.party2Statements)
          : [],
    };
  });

  return { comparisons: formattedComparisons };
}

function removeDuplicates(statements) {
  return [...new Set(statements)];
}

function mergeRedundantStatements(statements) {
  const uniqueStatements = removeDuplicates(statements);
  return uniqueStatements.map((statement) => statement.trim()).filter(Boolean);
}

(async () => {
  const party1Pdf = "./Congress-Manifesto-English-2024-Dyoxp_4E.pdf";
  const party2Pdf = "./Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf";

  const party1Text = await extractTextFromPdf(party1Pdf);
  const party2Text = await extractTextFromPdf(party2Pdf);

  const categorizedParty1 = categorizeText(party1Text);
  const categorizedParty2 = categorizeText(party2Text);

  const comparisons = compareCategories(categorizedParty1, categorizedParty2);

  const report = generateReport(comparisons);

  fs.writeFileSync("report.json", JSON.stringify(report, null, 2));
})();
