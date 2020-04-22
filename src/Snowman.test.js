import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Snowman from './Snowman';


it("renders without crashing", function () {
  render(<Snowman />);
})

it("matches snapshot", function () {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("changes images on an incorrect guess", function () {
  const { getByText, getByTestId } = render(<Snowman words={["apple"]}/>);

  const bButton = getByText("b");
  fireEvent.click(bButton);

  const newImage = getByTestId("img");

  expect(newImage).not.toHaveAttribute("src", "0.png");
})

it("stays on the same image on a correct guess", function () {
  const { getByText, getByTestId } = render(<Snowman words={["apple"]}/>);

  const aButton = getByText("a");

  fireEvent.click(aButton);

  const newImage = getByTestId("img");
  expect(newImage).toHaveAttribute("src", "0.png");
})

it("shows image and correct word after max wrong guesses", function () {
  const { queryByText, getByTestId } = render(<Snowman words={["apple"]}/>);

  fireEvent.click(queryByText("b"));
  fireEvent.click(queryByText("c"));
  fireEvent.click(queryByText("z"));
  fireEvent.click(queryByText("x"));
  fireEvent.click(queryByText("o"));
  fireEvent.click(queryByText("v"));

  const img = getByTestId("img");
  expect(img).toHaveAttribute("src", "6.png");

  const msg = queryByText("You lose! The word was: apple");
  expect(msg).not.toBe(null);
})