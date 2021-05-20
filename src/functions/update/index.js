import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(key, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: key },
    UpdateExpression: 'set data = :d',
    ExpressionAttributeValues: { ':d': data },
    ReturnValues: 'UPDATED_NEW',
  }
  try {
    await db.update(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const { id } = JSON.parse(event.pathParameters)
    const { data } = JSON.parse(event.body)
    await updateItem(id, data)
    return `${id} updated with ${data}`
  } catch (err) {
    return { error: err }
  }
}
