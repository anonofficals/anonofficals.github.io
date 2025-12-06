import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import HackathonEnroll from "@/pages/HackathonEnroll";
import ProjectsSection from "@/components/dashboard/ProjectsSection";

describe("App Context Integration Tests", () => {
  test("HackathonEnroll page renders", () => {
    render(<HackathonEnroll />);
    expect(true).toBe(true);
  });

  test("ProjectsSection component renders", () => {
    render(<ProjectsSection />);
    expect(true).toBe(true);
  });
});
