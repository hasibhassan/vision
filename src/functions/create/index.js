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
  const requestJSON = JSON.parse(event.body)

  if (!requestJSON.id) {
    id = event.requestContext.requestId
  } else {
    id = requestJSON.id
  }

  try {
    await createItem(id, requestJSON.data)
    console.log(requestJSON)
    return `item: ${id} created with data: ${requestJSON.data}!`
  } catch (err) {
    return { error: err }
  }
}
