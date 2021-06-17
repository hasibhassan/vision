import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function addUserToDB(event, date) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: `USER#${event.sub}`,
      SK: `USER#${event.sub}`,
      EMAIL: `EMAIL#${event.email}`,
      CREATEDAT: date.toISOString(),
    },
  }

  try {
    await db.put(params).promise()
    console.log('Successfully added user to DB')
  } catch (err) {
    return err
  }
}

export default async (event) => {
  const requestJSON = JSON.parse(event.request.userAttributes)
  console.log(
    `event.request.userAttributes is :${requestJSON.sub}, email is: ${requestJSON.email} at least it got to in the handler.`
  )
  const date = new Date()
  try {
    console.log(`now its in the try block in the handler.`)
    await addUserToDB(JSON.parse, date)
    console.log('done adding user to dynamoDB')
    return event
  } catch (err) {
    return { error: err }
  }
}
