import { render, screen } from "@testing-library/react";
import BankAccountForm from "./BankAccountForm";
import userEvent from "@testing-library/user-event";

const validData = {
  name: "super bank",
  routingNumber: "044000024",
  accountNumber: "0123456789",
};

test("is save initially enabled", () => {
  render(<BankAccountForm />);

  expect(screen.getByRole("button", { name: /save/i })).toBeEnabled();
});

test("is save disabled after error in form occur", async () => {
  render(<BankAccountForm />);

  userEvent.type(screen.getByPlaceholderText(/bank name/i), " ");
  userEvent.type(screen.getByPlaceholderText(/bank name/i), "");

  expect(await screen.findByRole("button", { name: /save/i })).toBeDisabled();
});

test("is save enabled after fields filled", async () => {
  render(<BankAccountForm />);

  userEvent.type(screen.getByPlaceholderText(/bank name/i), validData.name);
  userEvent.type(screen.getByPlaceholderText(/routing number/i), validData.routingNumber);
  userEvent.type(screen.getByPlaceholderText(/account number/i), validData.accountNumber);

  expect(await screen.findByRole("button", { name: /save/i })).toBeEnabled();
});

test("is error visible for bank name input for too short value", async () => {
  render(<BankAccountForm />);

  userEvent.type(screen.getByPlaceholderText(/bank name/i), "bank");

  expect(await screen.findByText(/Must contain at least 5 characters/i)).toBeVisible();
});

test("is error not visible for bank routing input when proper value added", async () => {
  render(<BankAccountForm />);

  userEvent.type(screen.getByPlaceholderText(/bank name/i), "banks");

  expect(await screen.queryByText(/Must contain at least 5 characters/i)).toBeNull();
});

test("is error visible for bank routing input for wrong value", async () => {
  render(<BankAccountForm />);

  userEvent.type(screen.getByPlaceholderText(/routing number/i), "0123");

  expect(await screen.findByText(/Must contain a valid routing number/i)).toBeVisible();
});

test("is empty field error visible for bank routing input", async () => {
  render(<BankAccountForm />);

  userEvent.click(screen.getByPlaceholderText(/routing number/i));
  userEvent.type(screen.getByPlaceholderText(/routing number/i), "0123");
  expect(await screen.findByText(/Must contain a valid routing number/i)).toBeVisible();

  userEvent.clear(screen.getByPlaceholderText(/routing number/i));
  userEvent.click(screen.getByPlaceholderText(/bank name/i));

  expect(await screen.findByText(/Enter a valid bank routing number/i)).toBeVisible();
});
