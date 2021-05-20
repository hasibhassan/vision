import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function getItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
  }
  try {
    await db.get(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const result = await getItem(event.pathParameters.id)
    return result
  } catch (err) {
    return { error: err }
  }
}
