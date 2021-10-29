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

  try {
    const data = await getItem(id)
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }

  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
}
