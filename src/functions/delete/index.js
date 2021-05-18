import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function deleteData(id) {
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
    const id = event.pathParameters.id
    await deleteData(id)
    return 'Data deleted from table'
  } catch (err) {
    return { error: err }
  }
}
