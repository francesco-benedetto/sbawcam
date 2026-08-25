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

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setUsers(normalizeItems(payload, 'users'))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load users')
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Favorite Activity</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.username}>
                  <td>{user.displayName || '-'}</td>
                  <td>{user.username || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.favoriteActivity || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
