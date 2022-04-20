import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

const sender = { id: "1" };
const receiver = { id: "1" };

test("is pay button disabled on init render", async () => {
  render(<TransactionCreateStepTwo sender={sender} receiver={receiver} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

test("is request button initialy disabled", async () => {
  render(<TransactionCreateStepTwo sender={sender} receiver={receiver} />);

  expect(await screen.findByRole("button", { name: /request/i })).toBeDisabled();
});

test("is pay button enabled once note and amount inputs are filled with data", async () => {
  render(<TransactionCreateStepTwo sender={sender} receiver={receiver} />);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "50");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
