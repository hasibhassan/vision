const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`EVENT is: ${JSON.stringify(event)}`)

  async function getItem(cognitoIdentityId) {
    var params = {
      TableName: 'visiontable-prod',
      Key: { cognitoIdentityId },
    }
    try {
      const data = await db.get(params).promise()
      return data
    } catch (err) {
      return err
    }
  }

  const {
    pathParameters: { proxy: email },
  } = event

  const data = await getItem(email)

  let res = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
    },
    body: JSON.stringify(data),
  }

  return res
}
