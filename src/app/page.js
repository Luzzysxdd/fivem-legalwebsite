import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Divisions from "@/components/Divisions";
import LiveStats from "@/components/LiveStats";
import News from "@/components/News";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="gradient-line" />
      <Divisions />
      <LiveStats />
      <div className="gradient-line" />
      <News />
      <Footer />
    </main>
  );
}
