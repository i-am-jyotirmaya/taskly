import { SideBarList } from "@/components/main/side-bar/SideBarList";
import { SideBarListItem } from "@/components/main/side-bar/SideBarListItem";
import { useAppSelector } from "@/redux/hooks";
import { CalendarDaysIcon, CircleAlertIcon, DiamondIcon, SparklesIcon } from "lucide-react";

export const SideBar = () => {
  const { selectedCategory } = useAppSelector((state) => state.sideBar);
  return (
    <SideBarList selectedValue={selectedCategory}>
      <SideBarListItem value="important" icon={<CircleAlertIcon className="w-4 h-4" />} title="Important" />
      <SideBarListItem value="day" icon={<CalendarDaysIcon className="w-4 h-4" />} title="Your day" />
      <SideBarListItem value="star" icon={<SparklesIcon className="w-4 h-4" />} title="Starred" />
      <SideBarListItem value="all" icon={<DiamondIcon className="w-4 h-4" />} title="All tasks" />
    </SideBarList>
  );
};
