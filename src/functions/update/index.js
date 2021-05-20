import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(id, updatedData) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #d = :d',
    ExpressionAtributeNames: { '#d': data },
    ExpressionAttributeValues: { ':d': updatedData },
  }
  try {
    await db.update(params).promise()
  } catch (err) {
    return err
  }
}

export default async (event) => {
  const requestJSON = JSON.parse(event.body)
  const id = event.pathParameters.id
  const { data } = requestJSON

  try {
    console.log(`id is: ${id}`)
    console.log(`data is :${data}`)
    await updateItem(id, data)
    return `item with id: ${id} updated with data: ${data}`
  } catch (err) {
    return { error: err }
  }
}
