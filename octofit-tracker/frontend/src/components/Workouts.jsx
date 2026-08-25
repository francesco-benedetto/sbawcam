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

function Workouts({ endpoint }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(normalizeItems(payload, 'workouts'))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts')
        }
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Focus Area</th>
                <th>Difficulty</th>
                <th>Estimated Minutes</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || workout.title}>
                  <td>{workout.title || '-'}</td>
                  <td>{workout.focusArea || '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                  <td>{workout.estimatedMinutes ?? '-'}</td>
                  <td>{Array.isArray(workout.exercises) ? workout.exercises.join(', ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
