
import BenefitsSlider from "../components/BenefitsSlider"
import CardSlider from "../components/CardSlider"
import Credo from "../components/Credo"
import FAQ from "../components/FAQ"
import Hero from "../components/Hero"
import LittleGuy from "../components/LittleGuy"
import PaymentCards from "../components/PaymentCards"
import Testimonials from "../components/Testimonials"


const Home = () => {
  return (
    <div>
    <Hero/>
<PaymentCards/>
    <Credo/>
    <BenefitsSlider/>
    <LittleGuy/>
    <CardSlider/>
    <Testimonials/>
    <FAQ/>
    </div>
  )
}

export default Home