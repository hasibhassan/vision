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
  let updatedData
  if (event.body) {
    updatedData = event.body.data
  } else {
    updatedData = JSON.parse(JSON.stringify(event.body))
  }
  console.log(updatedData)

  try {
    await db
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { id: event.pathParameters.id },
        UpdateExpression: 'set #d = :d',
        ExpressionAtributeNames: { '#d': data },
        ExpressionAttributeValues: { ':d': updatedData },
      })
      .promise()
    return `item with id: ${event.pathParameters.id} updated with data: ${updatedData}`
  } catch (err) {
    return { error: err }
  }
}
