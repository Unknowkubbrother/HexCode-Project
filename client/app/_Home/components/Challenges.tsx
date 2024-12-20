import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "./Card";

const Challenges = () => {
  return (
    <section className="w-full flex flex-col mt-5">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-xl">Challenges</h1>
        <span className="flex justify-center items-center gap-3 font-semibold text-md">
          More <ArrowRight />
        </span>
      </header>
      <Carousel className="w-full mt-10">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <Card/>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
    </section>
  );
};

export default Challenges;
