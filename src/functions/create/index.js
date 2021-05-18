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

export default async (event, context) => {
  try {
    const contextId = context.awsRequestId
    const eventData = event.body
    await createData(contextId, eventData)
    return `item ${contextId} successfully created!`
  } catch (err) {
    return { error: err }
  }
}
