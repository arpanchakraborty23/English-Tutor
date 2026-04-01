import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Wrap in a minimal router-less test since ThemeToggle has no router deps
describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("renders without crashing", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("switch");
    expect(button).toBeInTheDocument();
  });

  it("starts in dark mode by default", () => {
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles to light mode on click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("switch");
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles back to dark mode on second click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("switch");
    fireEvent.click(button); // -> light
    fireEvent.click(button); // -> dark
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("has accessible aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("switch");
    expect(button).toHaveAttribute("aria-label");
  });
});
