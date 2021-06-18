import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function getItem(id) {
  const keyId = `USER#${id}`
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { PK: keyId, SK: keyId },
  }
  try {
    const item = await db.get(params).promise()
    console.log('item is', item)
    console.log('item stringified is', JSON.stringify(item))
    return item
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    let result = await getItem(event.pathParameters.id)
    result = JSON.stringify(result)
    console.log('result stringified is', result)
    return result
  } catch (err) {
    return { error: err }
  }
}
