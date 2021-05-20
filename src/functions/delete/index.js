import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function deleteItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
  }
  try {
    await db.delete(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    await deleteItem(event.pathParameters.id)
    return `item with id: ${event.pathParameters.id} deleted!`
  } catch (err) {
    return { error: err }
  }
}
