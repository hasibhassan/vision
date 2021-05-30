import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function getItem(id) {
  id = `USER#${id}`
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { PK: id, SK: id },
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
    result = JSON.stringify(result)
    return result
  } catch (err) {
    return { error: err }
  }
}
