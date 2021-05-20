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
    const { id, bodyData } = event.headers
    console.log(`console log si: ${id} ${bodyData}`)
    await updateItem(id, bodyData)
    return `item i ${id} updated with ${bodyData}`
  } catch (err) {
    return { error: err }
  }
}
