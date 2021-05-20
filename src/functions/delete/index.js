import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

// async function deleteItem(id) {
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Key: { id },
//   }
//   try {
//     await db.delete(params).promise()
//   } catch (err) {
//     return err
//   }
// }

export default async (event) => {
  try {
    await db
      .delete({
        TableName: process.env.TABLE_NAME,
        Key: { id: event.pathParameters.id },
      })
      .promise()
    return `deleted ze itemm ${event.pathParameters.id}`
  } catch (err) {
    return { error: err }
  }
}
