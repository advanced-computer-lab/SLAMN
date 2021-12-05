import { render, screen } from "@testing-library/react";
import App from "./App";
import Summary from "../src/Componenets/Reservation/Summary";

test("renders learn react link", () => {
  render(<Summary />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
