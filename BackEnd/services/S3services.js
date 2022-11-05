const AWS = require('aws-sdk');

exports.uploadToS3=(data, fileName)=>{
    const BUCKET_NAME = 'expensetrackingapp';
    const IAM_USER_KEY = 'accesskey';
    const IAM_USER_SECRET = 'secretkey';

    const s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    });
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err, s3response) => {
            console.log('s3response:', s3response);
            if (err) {
                console.log('err:', err);
                reject(err);
            }
            else {
                resolve(s3response.Location);
            }

        })
    })
}