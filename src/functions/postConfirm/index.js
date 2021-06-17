import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function addUserToDB(event, date) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: event.request.userAttributes.sub,
      // `USER#${event.request.userAttributes.sub}`,
      SK: event.request.userAttributes.sub,
      // `USER#${event.request.userAttributes.sub}`,
      // EMAIL: `EMAIL#${event.request.userAttributes.email}`,
      // CREATEDAT: date.toISOString(),
    },
  }

  try {
    console.log('adding user to db now... lets see what happens')
    const data = await db.put(params).promise()
    console.log(`Successfully added data ${data} to DB`)
    return data
  } catch (err) {
    return { error: err }
  }
}

export default async (event) => {
  console.log(
    `event.request.userAttributes is :${JSON.stringify(
      event.request.userAttributes.sub
    )}, email is: ${JSON.stringify(
      event.request.userAttributes.email
    )} at least it got to in the handler.`
  )
  // const date = new Date()
  try {
    console.log(`now its in the try block in the handler.`)
    const user = await addUserToDB(event)
    console.log(`done adding user: ${user} to dynamoDB`)
    return event
  } catch (err) {
    return { error: err }
  }
}
