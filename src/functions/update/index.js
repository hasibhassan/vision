import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

// async function updateItem(id, updatedData) {
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Key: { id },
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
  const requestJSON = JSON.parse(event.body)

  try {
    await db
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { id: event.pathParameters.id },
        UpdateExpression: 'set #d = :d',
        ExpressionAtributeNames: { '#d': 'data' },
        ExpressionAttributeValues: { ':d': requestJSON.data },
      })
      .promise()
    return `item with id: ${id} updated with data: ${requestJSON.data}`
  } catch (err) {
    return { error: err }
  }
}
