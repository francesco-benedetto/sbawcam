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

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setActivities(normalizeItems(payload, 'activities'))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities')
        }
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || `${activity.user}-${activity.activityDate}`}>
                  <td>{activity.user || '-'}</td>
                  <td>{activity.team || '-'}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
