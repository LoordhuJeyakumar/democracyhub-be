/* const fs = require("fs");
const pdf = require("pdf-parse");

const pdfPath = "../docs/Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf"; // Replace with your PDF path

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};

extractTextFromPDF(pdfPath)
  .then((text) => {
    console.log(text); // Text from PDF
    // You can save this text to a file or a database as needed
    fs.writeFileSync("../docs/ManifestoBjp_1.txt", text);
  })
  .catch((error) => {
    console.error("Error extracting text from PDF:", error);
  });
 */