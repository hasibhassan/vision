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
  try {
    let updatedData = event.body || event

    console.log(`event is ${event.body.data}`)

    await db
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { id: event.pathParameters.id },
        UpdateExpression: 'set #d = :d',
        ExpressionAtributeNames: { '#d': data },
        ExpressionAttributeValues: { ':d': updatedData },
      })
      .promise()

    console.log(event)

    console.log(updatedData)

    return `item with id: ${event.pathParameters.id} updated with data: ${updatedData}`
  } catch (err) {
    return { error: err }
  }
}
