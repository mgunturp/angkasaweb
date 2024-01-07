import Slider from "./components/cardslider";
import Footer from "./components/footer";
import SliderCard from "./components/slidercard";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="container-fluid pt-8 h-auto pb-4">
      <Navbar />
      <Hero />
      <Slider />
      <SliderCard />
      <Footer />
    </div>
  );
}