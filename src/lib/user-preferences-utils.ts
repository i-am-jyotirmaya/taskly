// type UserPreferencesType = {
//   taskListMode: "list" | "grid";
//   theme: "light" | "dark" | "system";
// };

export class UserPreferences {
  static get taskListMode(): "list" | "grid" | null {
    return localStorage.getItem("taskListMode") as "list" | "grid" | null;
  }
  static set taskListMode(value: "list" | "grid") {
    localStorage.setItem("taskListMode", value);
  }
}
