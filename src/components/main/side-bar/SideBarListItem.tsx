import clsx from "clsx";
import { SelectedCategoryContext } from "./selectedCategoryContext";
import { useAppDispatch } from "@/redux/hooks";
import { selectCategory } from "@/features/sideBar/sideBarSlice";
import { fetchAllTasks } from "@/features/taskList/taskListSlice";

type SideBarListItemProps = {
  icon?: React.ReactNode;
  title: string;
  value: string;
};

export const SideBarListItem: React.FC<SideBarListItemProps> = ({ icon, title, value }) => {
  const dispatch = useAppDispatch();
  return (
    <SelectedCategoryContext.Consumer>
      {(selectedValue) => (
        <li
          onClick={() => {
            dispatch(selectCategory(value));
            dispatch(fetchAllTasks());
          }}
          data-selected={selectedValue === value}
          className={clsx(
            "flex gap-4 items-center cursor-pointer w-full px-4 py-2 rounded-md hover:bg-secondary/70 data-[selected=true]:bg-secondary"
          )}
        >
          {icon}
          <span className="capitalize text-sm">{title}</span>
        </li>
      )}
    </SelectedCategoryContext.Consumer>
  );
};
