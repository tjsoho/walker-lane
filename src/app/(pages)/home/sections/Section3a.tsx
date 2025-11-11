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
        <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}
      </div>

      {/* Testimonial Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-40">
        <div className="max-w-xl lg:max-w-lg">
          <blockquote className="text-brand-cream">
            <p className="text-2xl font-inter italic mb-4  ">
              “We had no idea which direction to take until some friends told us about Walker Lane. After meeting with their team, we finally had a clear plan to achieve financial independence in retirement, without compromising the lifestyle we love.”
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
