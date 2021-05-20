import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function createItem(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id, data },
    ReturnValues: 'ALL_OLD',
  }
  try {
    await db.put(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event, context) => {
  try {
    const { awsRequestId } = context
    const { data } = event.body
    await createItem(awsRequestId, data)
    return `the returned values are: ${data} ID: ${awsRequestId}`
  } catch (err) {
    return { error: err }
  }
}
