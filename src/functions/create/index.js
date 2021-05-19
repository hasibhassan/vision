import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function createItem(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id, data },
    ReturnValues: 'ALL_OLD',
  }
  try {
    const newItems = await db.put(params).promise()
    return newItems
  } catch (err) {
    return err
  }
}

export default async (event, context) => {
  try {
    const contextId = context.awsRequestId
    const { data } = JSON.stringify(event.body)
    let returnedData = await createItem(contextId, data)
    returnedData = JSON.stringify(returnedData)
    return `the returned values are: ${returnedData}`
  } catch (err) {
    return { error: err }
  }
}
