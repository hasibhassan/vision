import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function getItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
  }
  try {
    await db.get(params).promise()
  } catch (err) {
    return err
  }
}

export default (event) => {
  try {
    // const { id } = event.pathParameters
    // let result = await getItem(id)
    return `${JSON.stringify(event)}`
  } catch (err) {
    return { error: err }
  }
}
