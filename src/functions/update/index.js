import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(id, value) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #d = :d',
    ExpressionAtributeNames: { '#d': data },
    ExpressionAttributeValues: { ':d': value },
  }
  try {
    await db.update(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const requestJSON = JSON.parse(event.body)
    await updateItem(event.pathParameters.id, requestJSON.data)
    return `item with id: ${requestJSON.id} data updated to: ${requestJSON.data}`
  } catch (err) {
    return { error: err }
  }
}
