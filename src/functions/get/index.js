import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function getItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
  }
  try {
    const data = await db.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const result = await getItem(event.pathParameters.id)
    return result.Item.data
  } catch (err) {
    return { error: err }
  }
}
