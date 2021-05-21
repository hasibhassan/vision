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
  console.log(`my friggin event body is:... ${event.body || event}`)
  let id
  console.log(`my event path parameters are: ${event.pathParameters}`)
  // if (!event.body.id) {
  id = event.requestContext.requestId
  // } else {
  //   id = event.body.id
  // }

  try {
    await createItem(id, event.body.data)
    return `item: ${id} created with data: ${event.body.data}!`
  } catch (err) {
    return { error: err }
  }
}
