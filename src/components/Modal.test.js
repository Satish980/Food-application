import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  it("renders correctly", () => {
    // Render the component
    const { getByText, getByAltText, getByTitle } = render(<Modal />);

    // Check if the close icon is present
    expect(getByTitle("close-icon")).toBeInTheDocument();

  });
});
