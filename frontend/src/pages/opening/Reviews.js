import { useEffect, useRef } from "react";

export default function CommunityReviews() {
  const intervalRef = useRef(null);
  const totalSlides = 5;
  const slideRefs = useRef([]);

  useEffect(() => {
    let current = 0;

    const showSlide = (index) => {
      slideRefs.current.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
        slide.style.zIndex = i === index ? "1" : "0";
      });
    };

    showSlide(current); // Show first

    intervalRef.current = setInterval(() => {
      current = (current + 1) % totalSlides;
      showSlide(current);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const testimonials = [
    {
      name: "Sarah T.",
      feedback:
        "Since joining this platform, my blog readership has doubled. The tools are intuitive and the community is incredibly supportive.",
    },
    {
      name: "Michael R.",
      feedback:
        "As a vlogger, I needed a platform that would help me grow my audience. The analytics tools here have been game-changing.",
    },
    {
      name: "Jessica L.",
      feedback:
        "The newsletter feature has transformed how I connect with my audience. It's so easy to create professional emails that get read.",
    },
    {
      name: "David K.",
      feedback:
        "This platform stands out for its community. The collaborations I've found here have taken my content to the next level.",
    },
    {
      name: "Priya S.",
      feedback:
        "From a hobby blogger to a full-time creator – this platform made my dream possible with great monetization tools.",
    },
  ];

  return (
    <section
      className="py-5 p-5 mt-5"
      style={{
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
      }}
    >
      <div className="container p-3">
        <h2 className="text-center fw-bold mb-5 display-6">
          <span style={{ color: "#111" }}>What Our </span>
          <span style={{ color:"#6C5CE7" }}>Community Says</span>
        </h2>

        <div className="position-relative" style={{ height: "230px" }}>
          {testimonials.map((item, index) => (
            <div
              key={index}
              ref={(el) => (slideRefs.current[index] = el)}
              className="mx-auto px-4 py-4 text-dark text-center shadow-lg"
              style={{
                transition: "opacity 0.6s ease-in-out",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                margin: "auto",
                width: "100%",
                maxWidth: "700px",
                opacity: 0,
                zIndex: 0,
                background:'linear-gradient(to right, #fdfbfb, #ebedee)', 
                borderRadius: "20px",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              }}
            >
              <h5 className="fw-bold mb-3" style={{ color:"#6C5CE7" }}>
                {item.name}
              </h5>
              <p className="lead fw-medium" style={{ color: "#333" }}>
                “{item.feedback}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
