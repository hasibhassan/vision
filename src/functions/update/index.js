import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set data = :d',
    ExpressionAttributeValues: { ':d': data },
    ReturnValues: 'UPDATED_NEW',
  }
  try {
    const updatedItem = await db.update(params).promise()
    return updatedItem
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const { id } = JSON.parse(event.pathParameters)
    const { data } = JSON.parse(event.body)
    const returnedData = await updateItem(id, data)
    return returnedData
  } catch (err) {
    return { error: err }
  }
}
