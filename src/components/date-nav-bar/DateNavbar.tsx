import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const dummyListOfDates = ["Today", "Yesterday", "7 Mar"];

export const DateNavbar = () => {
  const [selectedDate, setSelectedDate] = useState(dummyListOfDates[0]);

  const getDatesList = () => {
    return dummyListOfDates.map((date) => {
      return (
        <Button
          variant={selectedDate === date ? "default" : "ghost"}
          onClick={() => {
            setSelectedDate(date);
          }}
          className="w-full mb-2 justify-start"
        >
          {date}
        </Button>
      );
    });
  };
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-full p-4 py-6 max-w-44">{getDatesList()}</ScrollArea>
    </aside>
  );
};
