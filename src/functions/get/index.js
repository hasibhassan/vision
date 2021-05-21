import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function getItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
  }
  try {
    const item = await db.get(params).promise()
    return item
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    let result = await getItem(event.pathParameters.id)
    return result
  } catch (err) {
    return { error: err }
  }
}
