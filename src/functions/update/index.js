import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

// async function updateItem(id, value) {
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Key: { id },
//     UpdateExpression: 'set #d = :d',
//     ExpressionAtributeNames: { '#d': data}
//     ExpressionAttributeValues: { ':d': value },
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
        Key: { id: requestJSON.id },
        UpdateExpression: 'set #d = :d',
        ExpressionAttributeNames: { '#d': 'data' },
        ExpressionAttributeValues: { ':d': requestJSON.data },
      })
      .promise()
    return `${requestJSON.id} updated value is: ${requestJSON.data}`
  } catch (err) {
    return { error: err }
  }
}
