import useCollection from '../hooks/useCollection.js'

export default function CollectionPage({ title, eyebrow, description, endpoint, columns, emptyTitle }) {
  const { items, status, error, refresh } = useCollection(endpoint)
  const isLoading = status === 'loading'

  return (
    <section className="collection-page" aria-labelledby="collection-title">
      <div className="page-heading">
        <div className="page-heading__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="collection-title">{title}</h1>
          <p className="page-heading__description">{description}</p>
        </div>
        <button
          className="refresh-button btn"
          disabled={isLoading}
          onClick={refresh}
          title={`Refresh ${title.toLowerCase()}`}
          aria-label={`Refresh ${title.toLowerCase()}`}
          type="button"
        >
          <span aria-hidden="true">↻</span>
        </button>
      </div>

      <div className="collection-meta" aria-live="polite">
        <span><strong>{isLoading ? '—' : items.length}</strong> records</span>
        <span className="collection-meta__endpoint">/api/{endpoint}/</span>
      </div>

      <div className="table-frame">
        {status === 'loading' && (
          <div className="state-panel" role="status">
            <span className="state-panel__mark" aria-hidden="true">...</span>
            <h2>Loading {title.toLowerCase()}</h2>
            <span className="loading-line" aria-hidden="true" />
          </div>
        )}

        {status === 'error' && (
          <div className="state-panel state-panel--error" role="alert">
            <span className="state-panel__mark" aria-hidden="true">!</span>
            <h2>Could not load {title.toLowerCase()}</h2>
            <p>{error}</p>
            <button className="state-panel__action" onClick={refresh} type="button">Try again</button>
          </div>
        )}

        {status === 'success' && items.length === 0 && (
          <div className="state-panel">
            <span className="state-panel__mark" aria-hidden="true">+</span>
            <h2>{emptyTitle}</h2>
            <p>There are no records in this collection yet.</p>
          </div>
        )}

        {status === 'success' && items.length > 0 && (
          <div className="table-scroll">
            <table className="data-table table">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${endpoint}-${index}`}>
                    {columns.map((column) => (
                      <td className={column.className ?? ''} key={column.label}>
                        {column.render ? column.render(item, index) : column.value(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
