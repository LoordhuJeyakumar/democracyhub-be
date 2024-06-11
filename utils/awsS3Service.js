const AWS = require("aws-sdk");
const envProcess = require("./config");

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: envProcess.AWS_ACCESS_KEY,
  secretAccessKey: envProcess.AWS_SECRET_KEY,
  region: envProcess.AWS_REGION,
});

const uploadFile = (file) => {
  const params = {
    Bucket: envProcess.AWS_S3_BUCKET,
    Key: `localIssues/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
  };

  return s3.upload(params).promise();
};

module.exports = {
  uploadFile,
};

// services/s3Service.js
/* const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const envProcess = require("./config");

const s3 = new S3Client({
  region: envProcess.AWS_REGION,
  credentials: {
    accessKeyId: envProcess.AWS_ACCESS_KEY_ID,
    secretAccessKey: envProcess.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  const params = {
    Bucket: envProcess.AWS_S3_BUCKET, // Replace with your bucket name
    Key: `localIssues/${Date.now()}_${file.originalname}`, // File name to save as in S3
    Body: file.buffer,
    ACL: "public-read", // Permissions for the file
  };

  const command = new PutObjectCommand(params);
  const data = await s3.send(command);
  return {
    Location: `https://${envProcess.AWS_S3_BUCKET}.s3.amazonaws.com/${params.Key}`,
  };
};

module.exports = {
  uploadFile,
};
 */
