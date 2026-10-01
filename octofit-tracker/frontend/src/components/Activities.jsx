import CollectionPage from './CollectionPage.jsx'

function formatDate(value) {
  if (!value) return 'Date not set'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Date not set'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

function formatActivityType(value) {
  return value ? String(value).replaceAll('_', ' ') : 'Activity'
}

const columns = [
  {
    label: 'ACTIVITY',
    render: (activity) => <span className="data-pill data-pill--warm">{formatActivityType(activity.type ?? activity.activityType)}</span>,
  },
  {
    label: 'ATHLETE',
    render: (activity) => <span className="data-table__primary">{activity.user?.username ?? activity.user?.name ?? activity.userName ?? 'Athlete'}</span>,
  },
  { label: 'DATE', render: (activity) => formatDate(activity.date ?? activity.createdAt) },
  {
    label: 'DURATION',
    className: 'data-table__numeric',
    render: (activity) => activity.durationMinutes ? `${activity.durationMinutes} min` : '-',
  },
  {
    label: 'DISTANCE',
    className: 'data-table__numeric',
    render: (activity) => activity.distanceKilometers ? `${activity.distanceKilometers} km` : '-',
  },
]

export default function Activities() {
  return (
    <CollectionPage
      title="Activity log"
      eyebrow="MOVEMENT / DAILY RECORD"
      description="Training sessions from across your OctoFit community."
      endpoint="activities"
      columns={columns}
      emptyTitle="No activities recorded"
    />
  )
}
