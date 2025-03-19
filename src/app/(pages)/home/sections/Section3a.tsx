import Image from "next/image";

const Section3a = () => {
  return (
    <div className="relative w-full min-h-[80vh] flex items-start justify-start">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/oldies.png" // Replace with your image path
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      </div>

      {/* Testimonial Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-40">
        <div className="max-w-xl lg:max-w-lg">
          <blockquote className="text-white">
            <p className="text-2xl font-medium italic mb-4">
              “As a young family, we felt lost with so many options. Walker Lane
              guided us with clear, honest advice that made all the difference!”
            </p>
            <footer className="text-lg">
              <span className="block text-sm opacity-75">
                John & Di
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Section3a;
