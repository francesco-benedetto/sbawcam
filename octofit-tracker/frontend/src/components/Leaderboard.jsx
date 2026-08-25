import { useEffect, useState } from 'react'

function normalizeItems(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload[key])) {
    return payload[key]
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  const firstArray = Object.values(payload).find(Array.isArray)
  return firstArray || []
}

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setEntries(normalizeItems(payload, 'leaderboard'))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard')
        }
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Total Minutes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.id || `${entry.user}-${entry.rank}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry.user || '-'}</td>
                  <td>{entry.team || '-'}</td>
                  <td>{entry.points ?? '-'}</td>
                  <td>{entry.totalMinutes ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
