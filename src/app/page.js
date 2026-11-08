import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UniMarquee from "@/components/UniMarquee";
import WhyChoose from "@/components/WhyChoose";
import Destinations from "@/components/Destinations";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import LifeChanging from "@/components/LifeChanging";
import Audience from "@/components/Audience";
import LimitedSeats from "@/components/LimitedSeats";
import RegisterModalProvider from "@/components/RegisterModal";
import ScrollTop from "@/components/ScrollTop";

export default function Home() {
  return (
    <RegisterModalProvider>
      <Header />
      <main>
        <Hero />
        <UniMarquee />
        <WhyChoose />
        <Destinations />
        <Process />
        <LifeChanging />
        <Audience />
        <LimitedSeats />
        <Testimonials />
      </main>
      <Footer />
      <ScrollTop />
    </RegisterModalProvider>
  );
}
