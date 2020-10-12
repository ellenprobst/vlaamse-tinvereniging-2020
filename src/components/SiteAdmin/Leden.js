import React, { useEffect } from 'react'

const Leden = () => {
  useEffect(() => {
    fetch('/api/test')
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log('Foutmelding:', err)
      })
  }, [])

  return (
    <>
      <h2>HIER KOMT DE DATABASE</h2>
    </>
  )
}

export default Leden
