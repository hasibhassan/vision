import Container from '@sections/Containers/Container'
import Navbar from '@sections/Navbar/Navbar'
import Hero from '@sections/Hero/Hero'
import Footer from '@sections/Footer/Footer'

// TODO: #6 refactor landing page and update components
export default function LandingPage() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <Footer />
    </Container>
  )
}
