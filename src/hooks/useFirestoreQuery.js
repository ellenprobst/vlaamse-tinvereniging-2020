import * as React from 'react'

const useFirestoreQuery = (query) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [docs, setDocs] = React.useState([])

  React.useEffect(() => {
    const unsubscribe = query.onSnapshot(
      (querySnapshot) => {
        setIsLoading(false)
        setDocs(
          querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data(),
          }))
        )
      },
      (err) => {
        setError(err)
      }
    )

    return () => unsubscribe()
  }, [])

  return [docs, isLoading, error]
}

export default useFirestoreQuery
