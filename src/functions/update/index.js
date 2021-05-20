import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set data = :d',
    ExpressionAttributeValues: { ':d': data },
  }
  try {
    await db.update(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const id = event.pathParameters
    let bodyData = JSON.parse(event.body)
    bodyData = bodyData.message
    // await updateItem(id, bodyData)
    return `${id} updated with ${bodyData}`
  } catch (err) {
    return { error: err }
  }
}
