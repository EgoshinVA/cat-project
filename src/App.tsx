import React, { useState, useEffect } from 'react'
import { Header } from './components/Header/Header'
import { CatCard } from './components/CatCard/CatCard'
import './App.css'

type Cat = {
  id: string
  url: string
}

const API_KEY = process.env.REACT_APP_API_KEY

export const App = () => {
  const [cat, setCat] = useState<Cat | null>(null)
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true)
  const [enabled, setEnabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchRandomCat = async () => {
    if (!enabled) return

    setLoading(true)
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`)
      const data = await response.json()
      setCat(data[0])
    } catch (error) {
      console.error('Some error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) {
      setCat(null)
      return
    }

    fetchRandomCat()

    if (autoRefresh && enabled) {
      const interval = setInterval(fetchRandomCat, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, enabled])

  return (
    <div className="app">
      <Header />

      <div className="controls">
        <div className="toggle-group">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">Enabled</span>
          </label>
        </div>

        {enabled && (
          <>
            <label className="auto-refresh">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
              />
              Auto-refresh every 5 seconds
            </label>

            <button className="get-cat-btn" onClick={fetchRandomCat} disabled={loading}>
              {loading ? 'Loading...' : 'Get Cat'}
            </button>
          </>
        )}
      </div>

      {enabled && cat && (
        <div className="cat-container">
          <CatCard imageUrl={cat.url} />
        </div>
      )}
    </div>
  )
}
