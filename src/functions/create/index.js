import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function createData(id, data) {
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
    const id = context.awsRequestId
    const data = event.body
    await createData(id, data)
    return id
  } catch (err) {
    return { error: err }
  }
}
