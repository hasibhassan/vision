import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(key, updatedData) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: key },
    UpdateExpression: 'set #d = :d',
    ExpressionAttributeNames: { '#d': data },
    ExpressionAttributeValues: { ':d': `${updatedData}` },
  }
  try {
    await db.update(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  const data = JSON.parse(event.body).data
  try {
    console.log(data)
    await updateItem(event.pathParameters.id, data)
    return 'updated successfully'
  } catch (err) {
    return { error: err }
  }
}
