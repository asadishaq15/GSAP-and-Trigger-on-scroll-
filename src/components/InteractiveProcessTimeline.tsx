import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  imageUrl: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Alex Johnson",
    role: "Creative Director",
    company: "Designflow",
    quote: "Working with this team transformed our digital presence completely. Their liquid animations brought our brand to life in ways we never imagined possible.",
    imageUrl: "/assets/testimonial1.jpg"
  },
  {
    name: "Sarah Chen",
    role: "Marketing VP",
    company: "TechFusion",
    quote: "The interactive experiences they created generated a 45% increase in user engagement. Their technical expertise combined with creative vision delivers results.",
    imageUrl: "/assets/testimonial2.jpg"
  },
  {
    name: "Marcus Williams",
    role: "Product Lead",
    company: "InnovateX",
    quote: "From concept to execution, they exceeded our expectations. The team's attention to detail and innovative approach sets them apart in the industry.",
    imageUrl: "/assets/testimonial3.jpg"
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !testimonialsRef.current) return;

    const testimonialCards = document.querySelectorAll('.testimonial-card');

    // Create staggered entrance animations
    gsap.fromTo(testimonialCards, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: false,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtle hover effect for the cards
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 22px 40px rgba(0, 0, 0, 0.1)",
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          duration: 0.3
        });
      });
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-black via-gray-900 to-black py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            See how we've helped businesses transform their digital presence with our innovative approach
          </p>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-lg border border-gray-700 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-indigo-500">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <div className="relative">
                <span className="text-5xl font-serif text-indigo-500 absolute -top-6 -left-2 opacity-30">"</span>
                <p className="text-gray-300 relative z-10 italic">
                  {testimonial.quote}
                </p>
                <span className="text-5xl font-serif text-indigo-500 absolute -bottom-10 -right-2 opacity-30">"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;