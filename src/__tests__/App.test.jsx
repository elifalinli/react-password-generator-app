import React from "react";
import {
  render,
  fireEvent,
  screen,
  act
} from "@testing-library/react";
import App from "../App";
import { describe, expect, it } from "vitest";
import Header from "../Header";

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render the initial UI", () => {
    expect(
      screen.getByPlaceholderText(/Minimum of 6 character/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Generate me a password!/ })
    ).toBeInTheDocument();
  });

  it("should generate a password and updates the result field", async () => {
    const generateButton = screen.getByRole("button", {
      name: /Generate me a password!/,
    });
    fireEvent.click(generateButton);

    await act(async () => {
      const resultField = await screen.findByPlaceholderText(
        "Minimum of 6 character"
      );
      expect(resultField).toBeInTheDocument();
      expect(resultField.value).toHaveLength(6);
    });
  });
  it("should handle input changes", async () => {
    const uppercaseCheckbox = screen.getByLabelText("Uppercase");
    const lowercaseCheckbox = screen.getByLabelText("Lowercase");
    const numberCheckbox = screen.getByLabelText("Number");
    const symbolCheckbox = screen.getByLabelText("Symbol");

    fireEvent.click(uppercaseCheckbox);
    expect(uppercaseCheckbox).not.toBeChecked();

    const generateButton = screen.getByRole("button", {
      name: /Generate me a password!/,
    });
    fireEvent.click(generateButton);
    await act(async () => {
      const resultField = await screen.findByPlaceholderText(
        "Minimum of 6 character"
      );
      expect(resultField.value).not.toMatch(/[A-Z]/);
    });
  });
 
});

describe("Header Component", () => {
  beforeEach(() => {
    render(<Header />);
  });
  it('should render the heading ', () => {
    expect(screen.getByRole('heading', {name: /Create Your Unique Password/})).toBeInTheDocument()
  });
})