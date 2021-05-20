import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function deleteItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    ReturnValues: 'ALL_OLD',
  }
  try {
    const deletedItem = await db.delete(params).promise()
    return deletedItem
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const id = event.pathParameters.id
    await deleteItem(id)
    return `deleted ${id}`
  } catch (err) {
    return { error: err }
  }
}
