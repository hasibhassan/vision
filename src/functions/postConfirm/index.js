import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function addUserToDB(event, date) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: `USER#${event.request.userAttributes.sub}`,
      SK: `USER#${event.request.userAttributes.sub}`,
      EMAIL: `EMAIL#${event.request.userAttributes.email}`,
      CREATEDAT: date.toISOString(),
    },
  }

  try {
    await db.put(params).promise()
    return data
  } catch (err) {
    return { error: err }
  }
}

export default async (event) => {
  const date = new Date()
  try {
    await addUserToDB(event, date)
    return event
  } catch (err) {
    return { error: err }
  }
}
