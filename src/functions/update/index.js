import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

// async function updateItem(id, data) {
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Key: { id },
//     UpdateExpression: 'set data = :d',
//     ExpressionAttributeValues: { ':d': data },
//   }
//   try {
//     await db.update(params).promise()
//   } catch (err) {
//     return err
//   }
// }

export default async (event) => {
  try {
    const requestJSON = JSON.parse(event.body)
    await db
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { id: event.pathParameters.id },
        UpdateExpression: 'set value = :v',
        ExpressionAttributeValues: { ':v': requestJSON.data },
      })
      .promise()
    return `${requestJSON.id} updated value is: ${requestJSON.data}`
  } catch (err) {
    return { error: err }
  }
}
