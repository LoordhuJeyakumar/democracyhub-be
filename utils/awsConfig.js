/* const AWS = require("aws-sdk");
const envProcess = require("./config");

// Configure AWS credentials
AWS.config.update({
  accessKeyId: envProcess.AWS_ACCESS_KEY,
  secretAccessKey: envProcess.AWS_SECRET_KEY,
  region: "", // e.g., 'us-east-1'
});

// Create an instance of S3
const s3 = new AWS.S3();

// Configure multer-s3
const multerS3Config = multerS3({
  s3: s3,
  bucket: "democracy-hub-issues-photos",
  key: (req, file, cb) => {
    // Set the key (filename) for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `issue-photos/${file.fieldname}-${uniqueSuffix}${path.extname(
        file.originalname
      )}`
    );
  },
});

module.exports = multerS3Config;
 */
