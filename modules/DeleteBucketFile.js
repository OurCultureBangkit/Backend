'use strict'

const path = require('path');
const { Storage } = require('@google-cloud/storage');

const pathKey = path.resolve('./serviceaccount.json');

const gcs = new Storage({
  projectId: process.env.projectId,
  keyFilename: pathKey
});

const deleteFromGcs = async (fileName) => {
  const bucketName = process.env.bucketName;
  const bucket = gcs.bucket(bucketName);
  const file = bucket.file(fileName);

  await file.delete();
}

module.exports = deleteFromGcs;