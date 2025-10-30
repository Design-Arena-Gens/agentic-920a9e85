import { NextRequest, NextResponse } from 'next/server'

const quotes = {
  inspirational: [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Age is merely the number of years the world has been enjoying you.",
    "It's never too late to be what you might have been.",
    "The only way to do great work is to love what you do.",
    "Life is 10% what happens to us and 90% how we react to it.",
  ],
  nature: [
    "In every walk with nature, one receives far more than he seeks.",
    "The earth has music for those who listen.",
    "Nature does not hurry, yet everything is accomplished.",
    "Look deep into nature, and then you will understand everything better.",
    "The clearest way into the universe is through a forest wilderness.",
  ],
  nostalgia: [
    "The good old days were when we were young enough to enjoy them.",
    "Memory is the diary we all carry with us.",
    "Yesterday's memories are today's inspiration.",
    "Time may pass, but memories last forever.",
    "The beautiful thing about memories is that they never change.",
  ],
  wisdom: [
    "Wisdom comes with the ability to be still.",
    "The older I get, the more I realize the value of privacy.",
    "Knowledge speaks, but wisdom listens.",
    "Turn your wounds into wisdom.",
    "The doors of wisdom are never shut.",
  ],
  family: [
    "Family is not an important thing. It's everything.",
    "The love of a family is life's greatest blessing.",
    "Family means nobody gets left behind or forgotten.",
    "In family life, love is the oil that eases friction.",
    "A happy family is but an earlier heaven.",
  ],
  faith: [
    "Faith is taking the first step even when you don't see the whole staircase.",
    "Prayer is the key to the morning and the bolt of the evening.",
    "Let your faith be bigger than your fears.",
    "With God, all things are possible.",
    "Faith makes all things possible. Love makes all things easy.",
  ],
}

const backgrounds = {
  inspirational: ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'],
  nature: ['linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)'],
  nostalgia: ['linear-gradient(135deg, #FDC830 0%, #F37335 100%)', 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)', 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)'],
  wisdom: ['linear-gradient(135deg, #283c86 0%, #45a247 100%)', 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)', 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)'],
  family: ['linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)', 'linear-gradient(135deg, #de6161 0%, #2657eb 100%)', 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)'],
  faith: ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #348F50 0%, #56B4D3 100%)', 'linear-gradient(135deg, #434343 0%, #000000 100%)'],
}

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json()

    const themeQuotes = quotes[theme as keyof typeof quotes] || quotes.inspirational
    const themeBackgrounds = backgrounds[theme as keyof typeof backgrounds] || backgrounds.inspirational

    const quote = themeQuotes[Math.floor(Math.random() * themeQuotes.length)]
    const background = themeBackgrounds[Math.floor(Math.random() * themeBackgrounds.length)]

    // Generate a simple SVG-based video frame
    const videoData = generateVideoFrame(quote, background, theme)

    return NextResponse.json({
      success: true,
      videoUrl: videoData,
      quote,
      theme,
    })
  } catch (error) {
    console.error('Error generating video:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}

function generateVideoFrame(quote: string, background: string, theme: string): string {
  // Create an HTML5 video using canvas and MediaRecorder API
  // For now, return a data URL for a static image that can be used as a video thumbnail
  const svg = `
    <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(102,126,234);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(118,75,162);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#grad1)"/>
      <text x="540" y="960" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
        <tspan x="540" dy="0">${quote.substring(0, 30)}</tspan>
        <tspan x="540" dy="90">${quote.substring(30, 60)}</tspan>
        <tspan x="540" dy="90">${quote.substring(60, 90)}</tspan>
        <tspan x="540" dy="90">${quote.substring(90, 120)}</tspan>
      </text>
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
