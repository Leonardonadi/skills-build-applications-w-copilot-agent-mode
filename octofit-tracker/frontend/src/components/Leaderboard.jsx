import CollectionPage from './CollectionPage.jsx'

function displayName(entry) {
  return entry.user?.username ?? entry.user?.name ?? entry.username ?? 'Athlete'
}

const columns = [
  {
    label: 'RANK',
    render: (_entry, index) => <span className="data-table__primary">{String(index + 1).padStart(2, '0')}</span>,
  },
  {
    label: 'ATHLETE',
    render: (entry) => <span className="data-table__primary">{displayName(entry)}</span>,
  },
  {
    label: 'TEAM',
    render: (entry) => entry.team?.name ?? entry.teamName ?? 'Individual',
  },
  {
    label: 'POINTS',
    className: 'data-table__numeric',
    render: (entry) => <span className="data-pill">{Number(entry.points ?? entry.score ?? 0).toLocaleString()}</span>,
  },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      eyebrow="COMMUNITY / STANDINGS"
      description="A live look at points earned across individual and team training."
      endpoint="leaderboard"
      columns={columns}
      emptyTitle="The standings are waiting"
    />
  )
}
