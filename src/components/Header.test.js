import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";


describe("Header component", () => {
  it("renders correctly and should have logos", () => {
    // Render the component
    const { getByAltText } = render(<Header />);

    // Check if the web logo is present
    const swiggyWebLogo = getByAltText("logo contains swiggy symbol with english word");
    expect(swiggyWebLogo).toBeInTheDocument();

    // check if the mobile logo is present
    const swiggyMobileLogo = getByAltText("logo contains swiggy symbol");
    expect(swiggyMobileLogo).toBeInTheDocument();
  });
});
