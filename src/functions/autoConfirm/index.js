export default async (event, context, callback) => {
  // Log the event
  console.log(event)

  // Set the email as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty('email')) {
    event.response.autoVerifyEmail = true
  }

  // Set the phone number as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty('phone_number')) {
    event.response.autoVerifyPhone = true
  }

  // Return to Amazon Cognito
  callback(null, event)
}
