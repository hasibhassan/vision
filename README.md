# Vision API

## Installation

Hook it up to build on every push using CI/CD use least privileged IAM policy. Use the AWS Credentials workflow in Github Actions marketplace.

```bash
npm install serverless # this or npm i -g serverless
npm ci # alternatively you can setup caching on your build env
```

## IAM Role

For the IAM role you need to configure the policy as well as the trust policy for the lambda service.
