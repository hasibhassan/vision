import Container from '@sections/Containers/Container'
import Navbar from '@sections/Navbar/Navbar'
import SignIn from '@sections/SignIn/SignIn'
import Footer from '@sections/Footer/Footer'

export default function SignInPage() {
  return (
    <Container>
      <Navbar />
      <SignIn />
      <Footer />
    </Container>
  )
}
