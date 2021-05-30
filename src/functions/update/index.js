import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(PK, SK, updatedData) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { PK, SK },
    UpdateExpression: 'set #d = :d',
    ExpressionAttributeNames: { '#d': 'data' },
    ExpressionAttributeValues: { ':d': updatedData },
  }
  try {
    await db.update(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  const requestJSON = JSON.parse(event.body)

  try {
    await updateItem(event.pathParameters.id, requestJSON.data)
    return `${event.pathParameters.id} item updated with data: ${requestJSON.data}`
  } catch (err) {
    return { error: err }
  }
}
