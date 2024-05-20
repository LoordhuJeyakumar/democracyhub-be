const fs = require("fs");
async function main() {
  // Read the classification results from the file
  let results = await JSON.parse(
    fs.readFileSync("classifiedResults.json", "utf-8")
  );
  console.log(results);
  // Structure the data into a JSON format
  let categorizedData = {
    healthcare: [],
    education: [],
    ruralDevelopment: [],
    economy: [],
  };

  results.forEach((result) => {
    let category = result.labels[0]; // Assuming the first label is the most relevant
    if (category === "healthcare") {
      categorizedData.healthcare.push(result.text);
    } else if (category === "education") {
      categorizedData.education.push(result.text);
    } else if (category === "rural development") {
      categorizedData.ruralDevelopment.push(result.text);
    } else if (category === "economy") {
      categorizedData.economy.push(result.text);
    }
  });

  console.log(JSON.stringify(categorizedData, null, 2));

  // Save the structured JSON to a file
  fs.writeFileSync(
    "categorizedData.json",
    JSON.stringify(categorizedData, null, 2)
  );
}

main();
