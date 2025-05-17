import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyProps {
  title: string;
  client: string;
  services: string[];
  description: string;
  imageSrc: string;
  stats: { label: string; value: string }[];
  link: string;
}

const caseStudies: CaseStudyProps[] = [
  {
    title: "Immersive 3D Product Experience",
    client: "Neutrino Tech",
    services: ["3D Modeling", "UI/UX Design", "Interactive Animation"],
    description: "We created a fully immersive 3D product experience that allows users to explore and interact with Neutrino's latest smart device in a virtual environment.",
    imageSrc: "/assets/case1.jpg",
    stats: [
      { label: "Conversion Rate", value: "+38%" },
      { label: "User Engagement", value: "4.2min" }
    ],
    link: "/case-studies/neutrino"
  },
  {
    title: "Digital Transformation Campaign",
    client: "Elysium Finance",
    services: ["Visual Design", "Motion Graphics", "Web Development"],
    description: "A complete digital transformation that merged cutting-edge technology with elegant design to revolutionize how Elysium Finance communicates with its clients.",
    imageSrc: "/assets/case2.jpg",
    stats: [
      { label: "Acquisition Cost", value: "-27%" },
      { label: "Client Satisfaction", value: "96%" }
    ],
    link: "/case-studies/elysium"
  }
];

const CaseStudies: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animation for section title
    gsap.fromTo(
      ".section-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animations for each case study
    casesRef.current.forEach((caseRef, index) => {
      if (!caseRef) return;
      
      // Staggered entrance for each case study
      gsap.fromTo(
        caseRef,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: caseRef,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Image reveal animation
      gsap.fromTo(
        caseRef.querySelector('.case-image'),
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay: 0.2 + index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: caseRef,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stats counter animation
    document.querySelectorAll('.stat-value').forEach((stat) => {
      const targetValue = stat.textContent;
      gsap.from(stat, {
        textContent: "0",
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: function() {
          if (targetValue?.includes('%')) {
            stat.textContent = Math.round(Number(this.targets()[0].textContent)) + '%';
          } else if (targetValue?.includes('min')) {
            stat.textContent = Number(this.targets()[0].textContent).toFixed(1) + 'min';
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Explore how we've helped innovative brands create meaningful digital experiences
          </p>
        </div>
        
        <div className="space-y-32">
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={index}
              ref={el => casesRef.current[index] = el}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2 overflow-hidden rounded-xl">
                <div className="case-image relative w-full aspect-[4/3] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden transform transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <p className="text-white text-sm font-medium mb-2">Client: {caseStudy.client}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.services.map((service, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-8 text-lg">{caseStudy.description}</p>
                
                <div className="flex gap-8 mb-8">
                  {caseStudy.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="stat-value text-3xl font-bold text-indigo-600">{stat.value}</p>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={caseStudy.link}
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  View Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;