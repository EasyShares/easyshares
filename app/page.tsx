import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroOne";
import Part3Section from "@/components/Benefits";
import Part4Section from "@/components/HowItWorks";
import Cta from "@/components/cta";
import PayoutSystem from "@/components/PayoutMessage";
import TheBestPlartformMessage from "@/components/TheBestPlartformMessage";

export default async function Home() {
  return (
    <>
      <Nav></Nav>
      <HeroSection></HeroSection>
      <Part3Section></Part3Section>
      <Part4Section></Part4Section>
      <PayoutSystem></PayoutSystem>
      <TheBestPlartformMessage></TheBestPlartformMessage>
      <Cta></Cta>
      <Footer></Footer>
    </>
  );
}
