import withAuth from '@sections/HOC/withAuth'

function SavedPage() {
  return (
    <div>
      <p>hello saved page</p>
    </div>
  )
}

export default withAuth(SavedPage)
