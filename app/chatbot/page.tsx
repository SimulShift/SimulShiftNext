'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState} from 'react'

const ChatBotPage = () => {
  const [personality, setPersonality] = useState('')
  const [twitchChannel, setTwitchChannel] = useState('')

  const handlePersonalityChange = e => {
    setPersonality(e.target.value)
  }

  const handleTwitchChannelChange = e => {
    setTwitchChannel(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Logic to handle the form submission and request the chat bot
    // You can make an API call or perform any other actions here
    console.log('Personality:', personality)
    console.log('Twitch Channel:', twitchChannel)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Chat Bot Page</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="personality" className="block font-semibold mb-2">
            Personality:
          </label>
          <input
            type="text"
            id="personality"
            value={personality}
            onChange={handlePersonalityChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="twitchChannel" className="block font-semibold mb-2">
            Twitch Channel:
          </label>
          <input
            type="text"
            id="twitchChannel"
            value={twitchChannel}
            onChange={handleTwitchChannelChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Request Chat Bot
        </button>
      </form>
    </div>
  )
}

export default ChatBotPage
