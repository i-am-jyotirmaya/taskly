import fs from "fs";

const generateDummyListOfTasks = (numberOfTasks = 5, prefix = "", name = "Task") => {
  const list = [];
  for (let i = 0; i < numberOfTasks; ) {
    list.push(`${prefix}-${name}-${++i}`);
  }
  return list;
};

const generateRandomPriorities = () => {
  const priorities = ["LOW", "NORMAL", "HIGH"];
  return priorities[Math.floor(Math.random() * priorities.length)];
};

// function randomDate(start, end, startHour, endHour) {
//   var date = new Date(+start + Math.random() * (end - start));
//   var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
//   date.setHours(hour);
//   return date;
// }
//Code from ChatGPT
function generateTaskDates() {
  // Generate a createdDate within the past 30 days
  const createdDate = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));

  // Generate an updatedDate that is after createdDate, within 15 days. Some tasks won't be updated.
  const shouldUpdate = Math.random() > 0.5; // 50% chance the task has been updated
  const updatedDate = shouldUpdate
    ? new Date(createdDate.getTime() + Math.floor(Math.random() * 15 * 24 * 60 * 60 * 1000))
    : new Date(createdDate);

  // Generate a dueDate that is after createdDate, within the next 30 days from createdDate
  const dueDate = new Date(createdDate.getTime() + Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));

  // Generate a completedDate that is either null or after the createdDate but before dueDate for simplicity
  const shouldComplete = Math.random() > 0.5; // 50% chance the task has been completed
  const completedDate = shouldComplete
    ? new Date(createdDate.getTime() + Math.floor(Math.random() * (dueDate.getTime() - createdDate.getTime())))
    : null;

  // Assuming a 70% chance a reminder is set, and it's set between the created date and the due date
  const shouldRemind = Math.random() < 0.7;
  const reminderDate = shouldRemind
    ? new Date(createdDate.getTime() + Math.floor(Math.random() * (dueDate.getTime() - createdDate.getTime())))
    : null;

  return {
    createdDate: createdDate,
    updatedDate: updatedDate,
    dueDate: dueDate,
    completedDate: completedDate,
    reminderDate: reminderDate,
  };
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const allTags = ["daily", "personal", "social", "health", "important"];
const generateTagsArray = () => {
  console.log("Generating tags array");
  const numberOfTags = Math.floor(Math.random() * 4) + 1; // between 1 and 4 tags.
  console.log(numberOfTags);
  const list = [];
  for (let i = 0; i < numberOfTags; i++) {
    list.push(allTags[Math.floor(Math.random() * allTags.length)]);
  }
  console.log(`Tags: ${list}`);
  return list;
};
const taskNames = generateDummyListOfTasks(40);
console.log("Task names generated");
const result = [];
taskNames.map((name, i) => {
  //   const createdDate = randomDate(new Date(2024, 3, 1), new Date(), 0, 23);
  const { completedDate, createdDate, dueDate, updatedDate, reminderDate } = generateTaskDates();
  const task = {
    name,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: generateTagsArray(),
    completed: [true, false].at(Math.floor(Math.random() * 2)),
    createdDate,
    updatedDate,
    // id: `${name}-${i}`,
    id: generateUUID(),
    priority: generateRandomPriorities(),
    user: "me",
    category: ["personal", "office", "hobby", "social"].at(Math.floor(Math.random() * 4)),
    dueDate,
    reminder: reminderDate,
    notes: [],
    attachments: [],
    completedDate,
    status: ["pending", "in_progress", "complete"].at(Math.floor(Math.random() * 3)),
    type: "",
  };

  result.push(task);
});

fs.writeFileSync("testTasks.json", JSON.stringify(result));
