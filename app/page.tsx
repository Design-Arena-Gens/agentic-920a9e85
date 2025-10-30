'use client'

import { useState } from 'react'

export default function Home() {
  const [generating, setGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('inspirational')

  const themes = [
    { id: 'inspirational', name: 'Inspirational Quotes', emoji: '✨' },
    { id: 'nature', name: 'Nature & Scenery', emoji: '🌿' },
    { id: 'nostalgia', name: 'Nostalgic Memories', emoji: '📻' },
    { id: 'wisdom', name: 'Life Wisdom', emoji: '🦉' },
    { id: 'family', name: 'Family Values', emoji: '❤️' },
    { id: 'faith', name: 'Faith & Prayer', emoji: '🙏' },
  ]

  const generateVideo = async () => {
    setGenerating(true)
    setVideoUrl('')

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: selectedTheme }),
      })

      const data = await response.json()

      if (data.success) {
        setVideoUrl(data.videoUrl)
      }
    } catch (error) {
      console.error('Error generating video:', error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Facebook Video Generator</h1>
            <p className="text-blue-100 text-lg">Create engaging faceless videos that older audiences love</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Choose Your Video Theme</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedTheme === theme.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{theme.emoji}</div>
                    <div className="font-medium text-gray-800">{theme.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateVideo}
              disabled={generating}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                generating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {generating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Video...
                </span>
              ) : (
                '🎬 Generate Video'
              )}
            </button>

            {videoUrl && (
              <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <h3 className="text-xl font-semibold text-green-800 mb-4">✅ Video Generated Successfully!</h3>
                <video
                  src={videoUrl}
                  controls
                  className="w-full rounded-lg shadow-lg mb-4"
                />
                <a
                  href={videoUrl}
                  download="facebook-video.mp4"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  📥 Download Video
                </a>
              </div>
            )}

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 What Makes These Videos Perfect for Older Audiences:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Large, easy-to-read text with high contrast</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Soothing colors and calming visuals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Nostalgic themes and timeless wisdom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Slow-paced transitions and gentle animations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Wholesome, positive, and family-friendly content</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
