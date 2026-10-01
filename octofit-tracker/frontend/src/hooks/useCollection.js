import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useCollection(collection) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [requestNumber, setRequestNumber] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(collection, controller.signal)
      .then((records) => {
        setItems(records)
        setStatus('success')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message || 'Unable to load this collection.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [collection, requestNumber])

  return {
    items,
    status,
    error,
    refresh: () => {
      setStatus('loading')
      setError('')
      setRequestNumber((current) => current + 1)
    },
  }
}
