import React from "react";

//import Features from "./components/Features";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import Highlights from "./components/Highlights";
// import HowItWorks from "./components/HowItWorks";
// import Model from "./components/Model";
// import Navbar from "./components/Navbar";
import LiquidVideoSection from "./components/LiquidVideoSection";
import InteractiveProcessTimeline from "./components/InteractiveProcessTimeline";
import CaseStudies from "./components/CaseStudies";

  
const App = () => {
  return (
    <main className="bg-black">
      {/* <Navbar /> */}
      {/* <Hero /> */}
      {/* <Highlights /> */}
<CaseStudies/>
      {/* <Model /> */}
      <LiquidVideoSection
        videoSrc="/assets/video.mp4"
        title="Lusion is a digital production studio that brings your ideas to life"
        description="Through visually captivating designs and interactive experiences. With our talented team, we push the boundaries by solving complex problems, delivering tailored solutions that exceed expectations and engage audiences."
      />
      <InteractiveProcessTimeline/>
      {/* <Features /> */}
      {/* <HowItWorks /> */}
      {/* <Footer /> */}
    </main>
  );
};

export default App;