"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Button } from "@/components/ui/button";
  import MarkDown from "@/components/ui/MarkDown";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Gift, Users, NotebookTabs } from 'lucide-react';
  
export default function Hub() {
    
    return (
      <main className="w-full h-full flex flex-col gap-10 mt-10">
        <header className="w-full flex justify-between px-10 items-center">
          <span className="flex gap-3 items-center justify-center">
            <span className="text-2xl font-bold">Google Challenges</span>
            <span className="text-lg font-semibold text-primary">
              <span>Opening time - </span>
              <span className="text-green-400">Now - 25 Feb 2025</span>
            </span>
          </span>
          <Button>Join Challenge</Button>
        </header>
        <div className="w-[90%] m-auto flex justify-center items-center">
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-3 md:basis-1/2 lg:basis-1/3 h-[320px]"
                >
                  <img src="https://wallpapershome.com/images/pages/ico_h/27093.jpg" alt="promote" className="w-full h-full object-contain rounded-lg" key={index}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-[90%] m-auto flex flex-col">
          <span className="text-lg font-semibold flex justify-start items-center gap-1 mb-3">
            <NotebookTabs />
            <span>Detail Challenge</span>
          </span>
          <MarkDown data={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis distinctio reiciendis nulla sit, quidem ut voluptatum quaerat? Aliquam suscipit aut cupiditate maxime officia quae, tempore eius deleniti sequi? Odio ducimus rem eos dolores exercitationem nisi asperiores sapiente. In aliquam pariatur iure deleniti natus perspiciatis eos cumque, maiores vel aperiam obcaecati!"} />
        </div>
  
        <div className="w-[90%] m-auto flex flex-col">
          <span className="text-lg font-semibold flex justify-start items-center gap-1">
            <Users />
            <span>Player Joined</span>
          </span>
          <div className="w-full flex justify-start items-center gap-5 mt-5 flex-wrap">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Avatar key={idx} className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
  
  
        <div className="w-[90%] m-auto flex flex-col gap-3">
          <span className="text-lg font-semibold flex justify-start items-center gap-1">
            <Gift />
            <span>Rewards</span>
          </span>
          <div className="w-full ml-5 flex flex-col gap-3">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Order</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-center">#1</TableCell>
                  <TableCell className="text-center">100000$</TableCell>
                </TableRow>
                <TableRow className="bg-bgsecondary">
                  <TableCell className="font-medium text-center">#2</TableCell>
                  <TableCell className="text-center">50000$</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-center">#1</TableCell>
                  <TableCell className="text-center">10000$</TableCell>
                </TableRow>
              </TableBody>
            </Table>
  
          </div>
  
        </div>
      </main>
    );
  }
  