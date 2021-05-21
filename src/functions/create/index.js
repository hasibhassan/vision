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
  console.log(event.body)
  let id
  console.log(event.requestContext)
  console.log(event.requestContext.requestId)

  // if (!event.body.id) {
  id = event.requestContext.requestId
  // } else {
  //   id = event.body.id
  // }
  const requestJSON = JSON.parse(event.body)
  try {
    await createItem(id, requestJSON.data)
    console.log(requestJSON)
    return `item: ${id} created with data: ${requestJSON.data}!`
  } catch (err) {
    return { error: err }
  }
}
