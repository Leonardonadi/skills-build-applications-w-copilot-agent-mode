import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    label: 'WORKOUT',
    render: (workout) => <span className="data-table__primary">{workout.name ?? workout.title ?? 'Untitled workout'}</span>,
  },
  {
    label: 'CATEGORY',
    render: (workout) => <span className="data-pill">{workout.category ?? 'General'}</span>,
  },
  {
    label: 'DURATION',
    className: 'data-table__numeric',
    render: (workout) => workout.durationMinutes ? `${workout.durationMinutes} min` : '-',
  },
  {
    label: 'LEVEL',
    render: (workout) => <span className="data-pill data-pill--warm">{workout.difficulty ?? workout.level ?? 'All levels'}</span>,
  },
]

export default function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      eyebrow="TRAINING / SUGGESTIONS"
      description="A library of sessions for strength, endurance, and recovery."
      endpoint="workouts"
      columns={columns}
      emptyTitle="No workouts available"
    />
  )
}
