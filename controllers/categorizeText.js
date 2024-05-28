/* const fs = require("fs");
const categories = require("./categories");

const preprocessedText1 = JSON.parse(
  fs.readFileSync("../docs/preprocessedText1.json", "utf-8")
);

const preprocessedText2 = JSON.parse(
  fs.readFileSync("../docs/preprocessedText2.json", "utf-8")
);

const categorizeText = (tokens, categories) => {
  let categorizedData = {};

  // Initialize categories
  for (let category in categories) {
    categorizedData[category] = [];
  }

  // Categorize tokens
  tokens.forEach((token) => {
    for (let category in categories) {
      if (categories[category].includes(token.toLowerCase())) {
        categorizedData[category].push(token);
        break;
      }
    }
  });

  return categorizedData;
};

const categorizedText1 = categorizeText(preprocessedText1, categories);
const categorizedText2 = categorizeText(preprocessedText2, categories);

fs.writeFileSync(
  "../docs/categorizedText1.json",
  JSON.stringify(categorizedText1, null, 2)
);
fs.writeFileSync(
  "../docs/categorizedText2.json",
  JSON.stringify(categorizedText2, null, 2)
);

console.log("Categorization complete");
 */
/* 
const fs = require("fs");
const pdfParse = require("pdf-parse");

// Load the categorized keywords
const categorizedKeywords = require("./categories");

const getTextDatafromPdf = async (filePath) => {
  let dataBuffer = fs.readFileSync(filePath);
  let data = await pdfParse(dataBuffer);
  return data.text;
};

const categorizeText = (text, categories) => {
  const categorizedText = {};

  // Initialize categories
  Object.keys(categories).forEach((category) => {
    categorizedText[category] = [];
  });

  // Split text into words
  const words = text.split(/\s+/);

  // Categorize words
  words.forEach((word) => {
    for (const category in categories) {
      if (
        categories[category].some((keyword) =>
          word.toLowerCase().includes(keyword.toLowerCase())
        )
      ) {
        categorizedText[category].push(word);
      }
    }
  });

  return categorizedText;
};

(async () => {
  // Load and categorize the text from both PDFs
  const text1 = await getTextDatafromPdf(
    "../docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf"
  );
  const text2 = await getTextDatafromPdf(
    "../docs/Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf"
  );

  const categorizedText1 = categorizeText(text1, categorizedKeywords);
  const categorizedText2 = categorizeText(text2, categorizedKeywords);

  // Save the categorized text to JSON files
  fs.writeFileSync(
    "categorizedText1.json",
    JSON.stringify(categorizedText1, null, 2)
  );
  fs.writeFileSync(
    "categorizedText2.json",
    JSON.stringify(categorizedText2, null, 2)
  );

  console.log("Categorization complete");
})(); */

const fs = require("fs");
const pdfParse = require("pdf-parse");

const getTextDatafromPdf = async (filePath) => {
  let dataBuffer = fs.readFileSync(filePath);
  let data = await pdfParse(dataBuffer);
  return data.text;
};

const keywordMapping = {
  Healthcare: [
    "healthcare",
    "health",
    "medical",
    "medicine",
    "hospital",
    "clinic",
    "health insurance",
    "healthcare infrastructure",
  ],
  Education: [
    "education",
    "school",
    "college",
    "university",
    "curriculum",
    "teacher",
    "student",
    "education technology",
  ],
  "Rural Development and Agriculture": [
    "rural",
    "agriculture",
    "farmer",
    "crop",
    "livestock",
    "farming",
    "rural infrastructure",
  ],
  "Infrastructure and Transportation": [
    "infrastructure",
    "road",
    "bridge",
    "railway",
    "airport",
    "transportation",
    "traffic",
  ],
  "Environment and Energy": [
    "environment",
    "energy",
    "renewable",
    "sustainable",
    "climate",
    "conservation",
    "pollution",
    "green",
    "recycling",
  ],
  "Public Safety and Law Enforcement": [
    "safety",
    "law",
    "crime",
    "police",
    "emergency",
    "security",
    "enforcement",
  ],
  "Public Services and Utilities": [
    "water",
    "sanitation",
    "electricity",
    "telecommunications",
    "public transport",
    "postal services",
  ],
  "Economic Development and Employment": [
    "economy",
    "employment",
    "jobs",
    "business",
    "industry",
    "trade",
    "investment",
  ],
  "Social Welfare and Poverty Alleviation": [
    "social welfare",
    "poverty",
    "housing",
    "community",
    "support",
    "benefits",
    "child welfare",
  ],
  "Urban Planning and Housing": [
    "urban planning",
    "housing",
    "development",
    "city",
    "urbanization",
    "zoning",
  ],
  "Arts, Culture, and Heritage Preservation": [
    "arts",
    "culture",
    "heritage",
    "museum",
    "history",
    "preservation",
  ],
  "Technology, Innovation, and Digital Infrastructure": [
    "technology",
    "innovation",
    "digital",
    "internet",
    "cybersecurity",
    "research",
    "development",
  ],
  "Community Development and Youth Empowerment": [
    "community",
    "youth",
    "empowerment",
    "engagement",
    "leadership",
  ],
  "Women's Rights and Gender Equality": [
    "women",
    "gender",
    "equality",
    "rights",
    "empowerment",
    "violence",
  ],
  "Indigenous Rights and Tribal Affairs": [
    "indigenous",
    "tribal",
    "rights",
    "community",
    "culture",
  ],
  "Disability Rights and Accessibility": [
    "disability",
    "accessibility",
    "rights",
    "inclusive",
  ],
  "National Security and Defense": [
    "security",
    "defense",
    "military",
    "national security",
  ],
  "Corruption and Good Governance": [
    "corruption",
    "transparency",
    "governance",
    "accountability",
  ],
  "International Relations and Foreign Policy": [
    "international",
    "foreign",
    "policy",
    "diplomacy",
    "relations",
  ],
  "Sports and Recreation": ["sports", "recreation", "fitness", "athletics"],
  "Child Rights and Protection": ["child", "protection", "rights", "safety"],
  "Senior Citizen Welfare": [
    "senior",
    "elderly",
    "welfare",
    "retirement",
    "care",
  ],
  "Science and Research": ["science", "research", "innovation", "development"],
  "Media and Freedom of Expression": [
    "media",
    "freedom",
    "expression",
    "press",
  ],
  "Consumer Protection and Fair Trade Practices": [
    "consumer",
    "protection",
    "fair trade",
    "rights",
  ],
  "Labor Rights and Welfare": ["labor", "rights", "worker", "welfare"],
  "Disaster Management and Emergency Response": [
    "disaster",
    "management",
    "emergency",
    "response",
  ],
};

const categorizeTextImproved = (text, keywordMapping) => {
  const categorizedText = {};

  // Initialize categories
  Object.keys(keywordMapping).forEach((category) => {
    categorizedText[category] = [];
  });

  // Split text into words and phrases
  const words = text.toLowerCase().split(/\s+/);

  // Categorize words and phrases
  words.forEach((word) => {
    for (const category in keywordMapping) {
      keywordMapping[category].forEach((keyword) => {
        if (word.includes(keyword)) {
          categorizedText[category].push(word);
        }
      });
    }
  });

  return categorizedText;
};

(async () => {
  const text1 = await getTextDatafromPdf(
    "../docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf"
  );
  const text2 = await getTextDatafromPdf(
    "../docs/Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf"
  );

  const categorizedText1 = categorizeTextImproved(text1, keywordMapping);
  const categorizedText2 = categorizeTextImproved(text2, keywordMapping);

  fs.writeFileSync(
    "categorizedText1.json",
    JSON.stringify(categorizedText1, null, 2)
  );
  fs.writeFileSync(
    "categorizedText2.json",
    JSON.stringify(categorizedText2, null, 2)
  );

  console.log("Improved categorization complete");
})();
