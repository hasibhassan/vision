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

export default async (event) => {
  try {
    const id = event.requestContext.requestId
    let {, bodyData }= event.headers
    await createItem(id, bodyData)
    return `the returned values are(this isnt workingggg): ${bodyData} ID: ${id}`
  } catch (err) {
    return { error: err }
  }
}
