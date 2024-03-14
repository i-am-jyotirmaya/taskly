import { describe, it, expect, afterAll, beforeAll, vi } from "vitest";
import { formatDate } from "@/lib/date-utils";

describe("formatDate", () => {
  // Mock the current date
  const realDateNow = Date.now;
  const mockDateNow = () => new Date("2024-03-12T15:03:00Z").getTime(); // Using UTC for consistency in tests

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDateNow());
  });

  afterAll(() => {
    vi.useRealTimers();
    Date.now = realDateNow; // Restore original Date.now
  });

  it("returns the time for today's date", () => {
    const now = new Date();
    expect(formatDate(now)).toBe(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase()
    );
  });

  it('returns "yesterday" for yesterday\'s date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatDate(yesterday)).toBe("yesterday");
  });

  it("returns the correct number of days ago within a week", () => {
    for (let i = 2; i <= 6; i++) {
      const pastDay = new Date();
      pastDay.setDate(pastDay.getDate() - i);
      expect(formatDate(pastDay)).toBe(`${i} days ago`);
    }
  });

  it("returns the formatted month and day for dates within the current year", () => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    expect(formatDate(twoMonthsAgo)).toBe(twoMonthsAgo.toLocaleDateString([], { month: "long", day: "numeric" }));
  });

  it("returns the year for dates older than the current year", () => {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    expect(formatDate(lastYear)).toBe(lastYear.toLocaleDateString([], { year: "numeric" }));
  });
});
