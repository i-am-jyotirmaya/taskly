import { FilterData } from "@/types/filter";
import { BooleanFilter, DateFilter, Filter, SelectFilter } from ".";
import { MultiSelectFilter } from "./otherFilters";

export class FilterFactory {
  private static filterMap = {
    [BooleanFilter.name]: BooleanFilter,
    [DateFilter.name]: DateFilter,
    [SelectFilter.name]: SelectFilter,
    [MultiSelectFilter.name]: MultiSelectFilter,
    // Add other filters as necessary
  };
  static buildFilter(filterData: FilterData): Filter | undefined {
    console.log("Building filters");
    const FilterClass = this.filterMap[filterData.filterType];

    if (!FilterClass) {
      console.error(`Unknown filter type: ${filterData.filterType}`);
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let param;
    if (filterData.filterType === DateFilter.name) {
      param = new Date(filterData.filterValue!);
    } else if (filterData.filterType === BooleanFilter.name) {
      param = filterData.filterBoolean!;
    } else if (filterData.filterType === SelectFilter.name || filterData.filterType === MultiSelectFilter.name) {
      param = filterData.filterValues || filterData.filterValue;
    } else {
      console.error(`Unsupported filter type: ${filterData.filterType}`);
      return undefined;
    }
    try {
      // Create a new instance of the filter class with the appropriate parameter
      const newInstance = new FilterClass(filterData.filterField, <never>param);
      console.log("Created instance", newInstance);
      return newInstance;
    } catch (error) {
      console.error("Error creating filter instance:", error);
      return undefined;
    }
  }
}
