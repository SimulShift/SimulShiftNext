import nodemailer from 'nodemailer'
import Transport from 'nodemailer-sendinblue-transport'
export async function POST(request) {
  // Parse the JSON data from the request body
  const {name, email, message} = await request.json()

  const transporter = nodemailer.createTransport(new Transport({apiKey: process.env.BREVO_API_KEY}))

  const mailOptions = {
    from: 'noreply@example.com',
    to: 'simulshiftsocial@gmail.com',
    subject: `message from ${name} at ${email}`,
    text: message,
  }

  // Send email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message)
    } else {
      console.log('Message sent successfully!')
      console.log('Server response:', info.response)
    }
  })

  // Return a response indicating success or any other relevant information
  return new Response('Email sent!', {status: 200})
}
