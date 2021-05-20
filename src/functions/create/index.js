import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

// async function createItem(id, data) {
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Item: { id, data },
//   }
//   try {
//     await db.put(params).promise()
//   } catch (err) {
//     return err
//   }
// }

export default async (event) => {
  let requestJSON = JSON.parse(event.body)
  try {
    await db
      .put({
        TableName: process.env.TABLE_NAME,
        Item: { id: requestJSON.id, value: requestJSON.data },
      })
      .promise()
    return `item: ${requestJSON.id} created!`
  } catch (err) {
    return { error: err }
  }
}
