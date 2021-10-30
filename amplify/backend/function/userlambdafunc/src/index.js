const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`EVENTSUB: ${JSON.stringify(event.requestContext.authorizer)}`)
  // const {
  //   requestContext: {
  //     authorizer: { cognitoIdentityId: id },
  //   },
  // } = event

  let cognitoIdentity = event.requestContext.authorizer.claims.sub

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

  try {
    const data = await getItem(cognitoIdentity)
    let res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
      },
      body: JSON.stringify(data),
    }

    return res
  } catch (err) {
    console.log(err)
  }
}
