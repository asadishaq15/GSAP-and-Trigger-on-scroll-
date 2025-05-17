import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface LiquidVideoSectionProps {
  videoSrc: string;
  title: string;
  description: string;
}

const LiquidVideoSection: React.FC<LiquidVideoSectionProps> = ({
  videoSrc,
  title,
  description,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoContainerRef.current || !contentRef.current) return;

    // Function to calculate center position
    const calculateCenter = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const finalVideoWidth = Math.min(90, containerWidth * 0.9); // 90% of container width, max 90vw
      // Calculate left offset to center the video
      return (containerWidth - finalVideoWidth) / 2;
    };

    // Create more responsive scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start as soon as the container hits the top
        end: "+=150%", // End after scrolling 150% of the viewport height
        scrub: 0.5, // Lower value for more responsive scrubbing
        pin: true, // Pin the element to ensure proper viewing
        pinSpacing: true, // Ensures proper spacing is maintained
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Update container height dynamically based on animation progress
          if (self.progress === 1) {
            // Animation complete, reduce extra space
            gsap.set(containerRef.current, { minHeight: "150vh" });
          }
        }
      },
    });

    // Initial position is fully visible with slight rounding
    gsap.set(videoContainerRef.current, {
      borderRadius: "15px", // More traditional rounded rectangle to start
      width: "30vw",
      height: "40vh",
      x: "10vw", // Position from the left to ensure fully visible
      y: "10vh", // Start a bit lower to give room for the animation
    });

    // Modified animation steps to ensure full visibility at the end
    tl.to(videoContainerRef.current, {
      borderRadius: "25px", // Slightly more rounded
      width: "35vw",
      height: "45vh",
      x: "5vw",
      y: "15vh", // Moving a bit lower
      duration: 0.8,
      ease: "none" // Linear easing for more direct scroll connection
    })
    .to(videoContainerRef.current, {
      borderRadius: "40% 20% 15% 35% / 25% 20% 30% 25%", // Beginning to morph
      width: "45vw",
      height: "55vh",
      x: "0vw",
      y: "20vh", // Moving lower
      duration: 0.8,
      ease: "none"
    })
    .to(videoContainerRef.current, {
      borderRadius: "65% 35% 45% 55% / 40% 50% 50% 60%", // Intermediate shape
      width: "50vw",
      height: "60vh",
      x: "5vw",
      y: "15vh", // Adjusted to stay more visible
      duration: 0.8,
      ease: "none"
    })
    .to(videoContainerRef.current, {
      borderRadius: "70% 30% 60% 40% / 30% 60% 40% 70%", // More dramatic
      width: "55vw",
      height: "65vh",
      x: "10vw",
      y: "12vh", // Adjusted to stay more visible
      duration: 0.8,
      ease: "none"
    })
    .to(videoContainerRef.current, {
      borderRadius: "55% 45% 65% 35% / 45% 45% 55% 55%", // Subtle shift
      width: "65vw",
      height: "70vh", 
      x: "12vw",
      y: "10vh", // Adjusted to stay more visible
      duration: 0.8,
      ease: "none"
    })
    .to(videoContainerRef.current, {
      borderRadius: "30% 30% 30% 30%", // Starting to become more square-like
      width: "75vw",
      height: "75vh",
      x: "12.5vw", // More centered
      y: "5vh", // Adjusted to stay more visible
      duration: 0.8,
      ease: "none"
    })
    .to(videoContainerRef.current, {
      borderRadius: "15px", // Back to square with slightly rounded corners
      width: "90vw", // Almost full screen width with margins
      height: "75vh", // Reduced height to ensure visibility
      x: "5vw", // Centered with 5vw margin on each side
      y: "10vh", // Positioned higher to ensure full visibility
      duration: 0.8,
      ease: "none",
      onUpdate: function() {
        // For the final step, dynamically calculate center position
        if (this.progress() > 0.9) { // Only in the last 10% of this animation
          const centerX = (window.innerWidth - videoContainerRef.current!.offsetWidth) / 2;
          gsap.set(videoContainerRef.current, { x: centerX });
        }
      }
    });

    // Make content fade out as user scrolls - more gradual
    tl.to(contentRef.current, {
      opacity: 0,
      y: "-20vh",
      duration: 4, // Spread this over the entire animation
    }, 0); // Start at the same time as first animation

    // Handle window resize to recalculate center position
    const handleResize = () => {
      // Get the current progress of the animation
      const scrollTriggerInstance = tl.scrollTrigger;
      if (scrollTriggerInstance && scrollTriggerInstance.progress > 0.9) {
        // If we're in the final stage, recalculate center
        const centerX = (window.innerWidth - videoContainerRef.current!.offsetWidth) / 2;
        gsap.set(videoContainerRef.current, { x: centerX });
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] overflow-hidden bg-white flex flex-col w-full"
    >
      <div className="w-full h-screen flex flex-col lg:flex-row items-start relative px-4">
        {/* Video container with relative positioning instead of absolute */}
        <div
          ref={videoContainerRef}
          className="w-[30vw] h-[40vh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[15px] overflow-hidden shadow-xl z-10 transition-transform duration-100 transform absolute left-0 top-[10vh]"
        >
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className="ml-auto mt-0 max-w-lg z-10 relative"
        >
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="text-lg text-gray-700 mb-8">{description}</p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
              Learn More
            </button>
            <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidVideoSection;