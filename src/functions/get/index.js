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
  const id = event.pathParameters.id

  try {
    let result = await getItem(id)
    result = JSON.stringify(result)
    return result
  } catch (err) {
    return { error: err }
  }
}
