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
    console.log('context id is:', contextId)
    const { data } = event.body
    console.log('the data is ...', data)
    await createData(contextId)
    return `item ${contextId} successfully created with value ${data}`
  } catch (err) {
    return { error: err }
  }
}
