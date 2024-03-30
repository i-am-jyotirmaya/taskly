import { SelectedCategoryContext } from "./selectedCategoryContext";

type SideBarListProps = {
  children?: React.ReactNode;
  selectedValue?: string;
};

export const SideBarList: React.FC<SideBarListProps> = ({ children, selectedValue = "day" }) => {
  if (!children) return <></>;

  return (
    <SelectedCategoryContext.Provider value={selectedValue}>
      <ul className="list-none flex flex-col gap-2 p-0 m-0">{children}</ul>
    </SelectedCategoryContext.Provider>
  );
};
