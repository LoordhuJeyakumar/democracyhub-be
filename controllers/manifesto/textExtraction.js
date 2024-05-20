const fs = require("fs");
const pdfParse = require("pdf-parse");

let filePathManifeto1 =
  "../../docs/Congress-Manifesto-English-2024-Dyoxp_4E.pdf";
let filePathManifeto2 =
  "../../docs/Modi-Ki-Guarantee-Sankalp-Patra-English_2.pdf";

const getTextDatafromPdf = async (filePath) => {
  let dataBuffer = fs.readFileSync(filePath);

  let data = await pdfParse(dataBuffer);

  const jsonData = { text: data.text };
  fs.writeFileSync("output1.json", JSON.stringify(jsonData, null, 2));
};

getTextDatafromPdf(filePathManifeto1);
