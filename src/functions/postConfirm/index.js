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
    const data = await db.put(params).promise()
    console.log('this is the data', data)
    return data
  } catch (err) {
    return { error: err }
  }
}

export default async (event) => {
  const date = new Date()
  try {
    const user = await addUserToDB(event, date)
    console.log('user is', user)
    return event
  } catch (err) {
    return { error: err }
  }
}
