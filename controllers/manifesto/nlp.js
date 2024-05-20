(async () => {
  const fs = require("fs");
  const pdfParse = require("pdf-parse");
  const natural = require("natural");

  // File paths
  let filePathManifeto1 =
    "../../docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf";
  let filePathManifeto2 =
    "../../docs/Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf";

  // Function to extract text from PDF
  const getTextDatafromPdf = async (filePath) => {
    let dataBuffer = fs.readFileSync(filePath);
    let data = await pdfParse(dataBuffer);
    return data.text;
  };

  // Function to extract keywords using NLP
  const extractKeywords = (text) => {
    const tokenizer = new natural.WordTokenizer();
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    const tokens = tokenizer.tokenize(text);
    const tokenizedText = tokens.join(" ");
    tfidf.addDocument(tokenizedText);

    const keywords = [];
    tfidf.listTerms(0).forEach((item) => {
      keywords.push(item.term);
    });

    return keywords;
  };

  // Function to categorize text based on keywords
  const categorizeText = (keywords, categories) => {
    const categorized = {};
    Object.keys(categories).forEach((category) => {
      categorized[category] = [];
      categories[category].forEach((keyword) => {
        if (keywords.includes(keyword.toLowerCase())) {
          categorized[category].push(keyword);
        }
      });
    });
    return categorized;
  };
  const categories = {
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
    "Science and Research": [
      "science",
      "research",
      "innovation",
      "development",
    ],
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
  const text1 = await getTextDatafromPdf(filePathManifeto1);
  const text2 = await getTextDatafromPdf(filePathManifeto2);
  const keywords1 = extractKeywords(text1);
  const keywords2 = extractKeywords(text2);
  const categorizedText1 = categorizeText(keywords1, categories);
  const categorizedText2 = categorizeText(keywords2, categories);
  // Main function

  const processManifestos = async () => {
    fs.writeFileSync(
      "categorizedText1.json",
      JSON.stringify(categorizedText1, null, 2)
    );
    fs.writeFileSync(
      "categorizedText2.json",
      JSON.stringify(categorizedText2, null, 2)
    );

    console.log("Categorization complete");
  };

  processManifestos();

  const generateSummaryScores = (categorizedText) => {
    const scores = {};
    for (const category in categorizedText) {
      scores[category] = categorizedText[category].length;
    }
    return scores;
  };

  const summaryScores1 = generateSummaryScores(categorizedText1);
  const summaryScores2 = generateSummaryScores(categorizedText2);

  fs.writeFileSync(
    "summaryScores1.json",
    JSON.stringify(summaryScores1, null, 2)
  );
  fs.writeFileSync(
    "summaryScores2.json",
    JSON.stringify(summaryScores2, null, 2)
  );

  console.log("Summary scores generated");
  const compareSummaryScores = (scores1, scores2) => {
    const comparison = {};
    for (const category in scores1) {
      if (scores1[category] > scores2[category]) {
        comparison[category] = "Party 1";
      } else if (scores1[category] < scores2[category]) {
        comparison[category] = "Party 2";
      } else {
        comparison[category] = "Equal";
      }
    }
    return comparison;
  };

  const comparison = compareSummaryScores(summaryScores1, summaryScores2);
  fs.writeFileSync("comparison.json", JSON.stringify(comparison, null, 2));

  console.log("Comparison complete");
  const generateReport = (comparison) => {
    let report = "Manifesto Comparison Report:\n\n";
    for (const category in comparison) {
      report += `${category}: ${comparison[category]}\n`;
    }
    return report;
  };

  const report = generateReport(comparison);
  fs.writeFileSync("comparisonReport.txt", report);

  console.log("Report generated:\n", report);
})();
