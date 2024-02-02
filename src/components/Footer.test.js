import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders correctly", () => {
    // Render the component
    const { getByText, getByAltText } = render(<Footer />);

    // Check if the Swiggy text is present
    expect(getByText("Swiggy")).toBeInTheDocument();

    // Check if the copyright information is present
    expect(getByText("© 2023 Bundl Technologies Pvt. Ltd")).toBeInTheDocument();

    // Check if the Swiggy logo is present
    const swiggyLogo = getByAltText("Logo contains symbol of swiggy");
    expect(swiggyLogo).toBeInTheDocument();
  });
});
