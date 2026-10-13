// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReportView } from "@/app/report-view";

describe("ReportView", () => {
  it("shows the band, issue count and the automated-scan disclaimer", () => {
    render(
      <ReportView
        url="https://a.test"
        score={{ score: 72, band: "severe", criticalCount: 2, seriousCount: 1, totalViolations: 9, affectedElements: 40 }}
      />,
    );
    expect(screen.getByText("SEVERE")).toBeTruthy();
    expect(screen.getByText(/9 automated issues/)).toBeTruthy();
    expect(screen.getByText(/does not establish full WCAG conformance/i)).toBeTruthy();
  });
});
