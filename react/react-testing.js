import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// Smoke Test: this is a low-value test, but better than nothing
it("renders without crashing", function () {
  render(<Card rank="A" suit="C" />);
});


// Snapshot Test:
it("matches snapshot", function () {
  const { container } = render(<Card rank="A" suit="C" />);
  expect(container).toMatchSnapshot();
});


// Test using the DOM:
it("has the correct alt text & src", function () {
  const { container, debug } = render(<Card rank="A" suit="C" />);
  const img = container.querySelector("img");
  debug(img);

  expect(img.getAttribute("alt")).toEqual("AC");
  expect(img.getAttribute("src")).toContain("AC.png");
});



/********************************** testing interactions */

//Snapshot of game at start
it("matches initial player hand: 2C 3C", function () {
  _feedChoice("2C 3C");
  const { container } = render(<NineteenGame />);
  expect(container).toMatchSnapshot();
});


// Snapshot after click draw
it("matches winning game: 2C 3C 4C > 5C 6C", function () {
  _feedChoice("2C 3C 4C   5C 6C");
  const { container } = render(<NineteenGame />);
  fireEvent.click(container.querySelector("#draw"));
  expect(container).toMatchSnapshot();
});


//real test with interaction
it("deals to player on draw", function () {
  _feedChoice("2C 3C 4C   5C 6C");
  const { container, debug } = render(<NineteenGame />);

  expect(container.querySelectorAll(".Card").length).toEqual(2);
  fireEvent.click(container.querySelector("#draw"));

  // now player has 3 cards (=9) and dealer has 2 cards (=11)
  expect(container.querySelectorAll(".Card").length).toEqual(5);

  debug(container);
  expect(container.querySelector("p")).toContainHTML("You win!");
});


// Additional Matchers
// .toHaveClass()
// .toBeInTheDocument()
// .toContainHTML()
// .toBeEmpty()

// Testing Events
// fireEvent.click(HTMLElement)
// fireEvent.submit(HTMLElement)
// fireEvent.input(HTMLElement)