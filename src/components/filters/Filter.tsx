import { FilterConfig } from "@/types/filter";
import React, { useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ZapIcon } from "lucide-react";
import { BasicTooltip } from "../ui/custom/BasicTooltip";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BooleanFilter, MultiSelectFilter } from "@/filters/otherFilters";
import {
  addQuickFilter,
  deactivateFilter,
  deselectFilter,
  removeQuickFilter,
  selectFilter,
} from "../main/config-bar/filterSlice";

type ExtraPropsForFilter = {
  className?: string;
};

type FilterProps = FilterConfig & ExtraPropsForFilter;

export const Filter: React.FC<FilterProps> = ({ id, label, multiple, type, options, className }) => {
  const dispatch = useAppDispatch();
  const { activeFilters, temporaryFilters, quickFilters } = useAppSelector((state) => state.filters);

  const controlStateFromActiveFilters = useMemo(() => {
    console.log("Executing control state from active");
    return activeFilters.find((filter) => filter.filterField === id);
  }, [activeFilters, id]);

  const controlStateFromTempFilters = useMemo(() => {
    console.log("Executing control state from temp");
    return temporaryFilters.find((filter) => filter.filterField === id);
  }, [temporaryFilters, id]);

  const controlStateFromQuickFilters = useMemo(() => {
    console.log("Executing control state from quick");
    return quickFilters.find((filter) => filter.filterField === id);
  }, [quickFilters, id]);

  const controlState = controlStateFromActiveFilters || controlStateFromTempFilters;

  const handleOnCheckedChange = async (checked: boolean) => {
    console.log("Dispatching boolean action");
    dispatch(
      selectFilter({
        filterField: id,
        filterType: BooleanFilter.name,
        filterBoolean: checked,
      })
    );
    // console.log("dispatching Fetching all tasks");
    // dispatch(fetchAllTasks());
  };

  // const handleOnValueChangeToggleGroup = (values: string[]) => {
  //   if (!values.length) {
  //     console.log("Deselecting filter", values, controlStateFromActiveFilters);
  //     if (controlStateFromActiveFilters) {
  //       console.log("Deactivating filter");
  //       dispatch(deactivateFilter(controlStateFromActiveFilters));
  //     } else
  //       dispatch(
  //         deselectFilter({
  //           filterField: id,
  //           filterType: MultiSelectFilter.name,
  //         })
  //       );
  //   } else {
  //     dispatch(
  //       selectFilter({
  //         filterField: id,
  //         filterType: MultiSelectFilter.name,
  //         filterValues: values,
  //       })
  //     );
  //   }
  // };

  const getFilterControl = () => {
    if (type === "select" && multiple) {
      return (
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={controlStateFromTempFilters?.filterValues ?? []}
          onValueChange={(values) => {
            if (!values.length) {
              dispatch(
                deselectFilter({
                  filterField: id,
                  filterType: MultiSelectFilter.name,
                })
              );
            } else {
              dispatch(
                selectFilter({
                  filterField: id,
                  filterType: MultiSelectFilter.name,
                  filterValues: values,
                })
              );
            }
          }}
        >
          {options?.map((option) => (
            <ToggleGroupItem
              className="hover:bg-accent/20 lg:hover:bg-accent"
              value={option.value}
              aria-label={`Toggle ${option.value}`}
              key={option.value}
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      );
    }
    if (type === "boolean") {
      return (
        <Switch checked={controlStateFromTempFilters?.filterBoolean ?? false} onCheckedChange={handleOnCheckedChange} />
      );
    }
    return <></>;
  };

  return (
    <div className={cn("", className)}>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        <div className="flex gap-1">
          <BasicTooltip tooltip="Add to quick fiters" side="left">
            <Button
              onClick={() => {
                if (controlStateFromQuickFilters) dispatch(removeQuickFilter(controlState!));
                else dispatch(addQuickFilter(controlState!));
              }}
              disabled={!controlState}
              variant="ghost"
              size="icon"
            >
              <ZapIcon fill={controlStateFromQuickFilters ? "currentColor" : "none"} className="w-4 h-4" />
            </Button>
          </BasicTooltip>
          <BasicTooltip tooltip="Remove filter" side="left">
            <Button
              onClick={() => {
                if (controlStateFromActiveFilters) {
                  dispatch(
                    deactivateFilter({
                      filterField: id,
                      filterType: "",
                    })
                  );
                } else if (controlStateFromTempFilters) {
                  dispatch(
                    deselectFilter({
                      filterField: id,
                      filterType: "",
                    })
                  );
                }
              }}
              variant="ghost"
              size="icon"
            >
              <Cross2Icon className="w-4 h-4" />
            </Button>
          </BasicTooltip>
        </div>
      </div>
      <div className="flex gap-4">{getFilterControl()}</div>
    </div>
  );
};
