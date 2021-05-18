import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function createData(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id },
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
    console.log(contextId)
    const { body } = event
    console.log(body)
    await createData(contextId)
    return `item ${contextId} successfully created with value ${body}`
  } catch (err) {
    return { error: err }
  }
}
