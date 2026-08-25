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

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setTeams(normalizeItems(payload, 'teams'))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load teams')
        }
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mascot</th>
                <th>City</th>
                <th>Members</th>
                <th>Weekly Goal (min)</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || team.name}>
                  <td>{team.name || '-'}</td>
                  <td>{team.mascot || '-'}</td>
                  <td>{team.city || '-'}</td>
                  <td>{team.memberCount ?? '-'}</td>
                  <td>{team.weeklyGoalMinutes ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
