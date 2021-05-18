import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function update(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id, data },
  }
  try {
    await db.put(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const id = event.pathParameters.id
    const data = JSON.parse(event.body)
    await update(id, data)
  } catch (err) {
    return { error: err }
  }
}
