const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  const {
    requestContext: {
      identity: { cognitoIdentityId: id },
    },
  } = event

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

  const data = await getItem(id)

  let res = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
    },
    body: JSON.stringify(data),
  }
  return res

  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
}
