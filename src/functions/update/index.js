import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

// async function updateItem(key, updatedData) {
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Key: { id: key },
//     UpdateExpression: 'set #d = :d',
//     ExpressionAtributeNames: { '#d': data },
//     ExpressionAttributeValues: { ':d': updatedData },
//   }
//   try {
//     await db.update(params).promise()
//   } catch (err) {
//     return err
//   }
// }

export default async (event) => {
  console.log(`event is ${event.body.data}`)

  try {
    await db
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { id: event.pathParameters.id },
        UpdateExpression: 'set #d = :d',
        ExpressionAtributeNames: { '#d': data },
        ExpressionAttributeValues: { ':d': event.body.data },
      })
      .promise()
    return `item with id: ${event.pathParameters.id} updated with data: ${event.body.data}`
  } catch (err) {
    return { error: err }
  }
}
