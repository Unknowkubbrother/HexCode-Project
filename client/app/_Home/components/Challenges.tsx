import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardChallenges from "./CardChallenges";
import Link from "next/link";

const Challenges = () => {
  return (
    <section className="w-full flex flex-col mt-10">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-xl">Challenges</h1>
        <Link href="/challenges" className="flex justify-center items-center gap-1 font-semibold text-md hover:text-primary duration-300">
          More <ArrowRight />
        </Link>
      </header>
      <Carousel className="w-full mt-5">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <CardChallenges/>
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
