import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import clsx from "clsx";

const dummyListOfDates = ["Today", "Yesterday", "7 Mar"];

type DateNavbarProps = {
  className?: string;
};

export const DateNavbar: FC<DateNavbarProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState(dummyListOfDates[0]);

  const getDatesList = () => {
    return dummyListOfDates.map((date) => {
      return (
        <Button
          key={date}
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
    <aside
      className={clsx(
        "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block",
        className
      )}
    >
      <ScrollArea className="h-full p-4 py-6 max-w-44">{getDatesList()}</ScrollArea>
    </aside>
  );
};
