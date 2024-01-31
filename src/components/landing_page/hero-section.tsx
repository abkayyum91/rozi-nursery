import Image from "next/image";
import { GetQuoteButton } from "..";

const HeroSection = () => {
  return (
    <section className="container flex flex-col-reverse gap-y-8 lg:flex-row lg:gap-x-5 lg:gap-y-0 items-center py-5">
      {/* hero text */}
      <div className="basis-[40%] lg:pl-5">
        <div className="text-center lg:text-start">
          {/* tag-line text */}
          <div className="grid">
            <h1 className="text-2xl font-semibold">
            Growing Greener, Living Brighter!
            </h1>
            <p className="py-1 text-base text-primary">
              - Your Journey Begins Here!
            </p>
            <p className="py-2 text-sm text-muted-foreground">
              Make your desirable garden with our <br />
              top quality Plants & Planters.
            </p>
          </div>
          {/* important links */}
          <div className="py-5">
            <GetQuoteButton />
          </div>
        </div>
      </div>

      {/* hero image */}
      <div className="basis-[60%] lg:pr-5">
        <Image
          src="/hero1.jpg"
          className="w-full"
          width={360}
          height={360}
          alt="Hero Image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
