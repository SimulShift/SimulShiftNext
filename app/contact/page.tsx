'use client'

import {FormEvent, useState} from 'react'
import styles from './contact.module.css'

const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Perform any form validation here

    setIsLoading(true)

    // Make an API call or use a service to send the email
    // You can customize the endpoint to your backend service
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, message}),
    })

    setIsLoading(false)

    if (response.ok) {
      setIsSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } else {
      // Handle error cases
    }
  }

  return (
    <div className={styles.contactContainer}>
      <p className="mb-4">
        Welcome to my contact page! I am delighted that you&#39;ve decided to reach out to me
        whether it is a question, suggestion, or just wanting to say hello. Feel free to fill out
        the form below with your details, and I will get back to you promptly.
      </p>
      {isSent ? (
        <p className="text-green-500 text-center">
          Thank you for your message! We&apos;ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className={styles.label}>
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              className={styles.input}
            ></textarea>
          </div>
          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactPage
