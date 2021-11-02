const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`EVENT is: ${JSON.stringify(event)}`)

  async function getItem(userEmail) {
    let params = {
      TableName: 'visiontable-prod',
      Key: { 'user': userEmail },
    }
    try {
      const data = await db.get(params).promise()
      return data
    } catch (err) {
      return err
    }
  }

  async function updateItem(userEmail, itemData) {
    let params = {
      TableName: 'visiontable-prod',
      Key: { 'user': userEmail },
      UpdateExpression: 'SET state = :newstate',
      ExpressionAttributeValues: { ':newstate': itemData },
    }
    try {
      await db.update(params).promise()
    } catch (err) {
      return err
    }
  }

  if (event.httpMethod === 'GET') {
    try {
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
    } catch (err) {
      let res = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
        },
        body: JSON.stringify(err),
      }

      return res
    }
  }

  if (event.httpMethod === 'POST') {
    const jsonBody = JSON.parse(event.body)
    const contextState = jsonBody.contextState
    console.log('state is', event.body.contextState)

    try {
      const {
        pathParameters: { proxy: email },
      } = event

      await updateItem(email, contextState)

      let res = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
        },
      }

      return res
    } catch (err) {
      let res = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
        },
      }

      return res
    }
  }
}
