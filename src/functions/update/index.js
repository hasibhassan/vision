import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    ExpressionAttributeValues: { ':data': data },
    ReturnValues: 'ALL_NEW',
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
    const id = event.pathParameters.id
    const { data } = JSON.parse(event.body)
    const returnedData = await updateItem(id, data)
    return returnedData
  } catch (err) {
    return { error: err }
  }
}
