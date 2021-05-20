import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function createItem(id, data) {
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
  let id
  let requestJSON = JSON.parse(event.body)
  if (!requestJSON.id) {
    id = event.requestContext.requestId
  }
  try {
    await createItem(id, requestJSON.data)
    return `item: ${id} created with data: ${requestJSON.data}!`
  } catch (err) {
    return { error: err }
  }
}
