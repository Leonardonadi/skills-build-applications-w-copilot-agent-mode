import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function displayName(user) {
  return user.username ?? user.name ?? user.fullName ?? 'Athlete'
}

function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '-'
    : new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(date)
}

const columns = [
  {
    label: 'ATHLETE',
    render: (user) => <span className="data-table__primary">{displayName(user)}</span>,
  },
  {
    label: 'EMAIL',
    render: (user) => user.email || <span className="data-table__muted">Not provided</span>,
  },
  {
    label: 'MEMBER SINCE',
    render: (user) => formatDate(user.createdAt),
  },
  {
    label: 'PROFILE',
    render: (user) => <span className="data-table__muted">{String(user._id ?? user.id ?? '-').slice(-6).toUpperCase()}</span>,
  },
]

export default function Users() {
  return (
    <CollectionPage
      title="Athletes"
      eyebrow="COMMUNITY / MEMBERS"
      description="People showing up, building habits, and moving forward."
      endpoint="users"
      apiUrl={usersApiUrl}
      columns={columns}
      emptyTitle="No athletes to show"
    />
  )
}
