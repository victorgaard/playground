import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./Modal";
import Button from "../Button/Button";

describe("Modal", () => {
  it("should render the component without crashing", () => {
    render(<Modal />);
  });

  it("should open the modal when trigger is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>
          <Button>Trigger</Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>Content</ModalContent>
        </ModalBody>
      </Modal>,
    );
    const buttonTrigger = screen.getByText("Trigger");
    await user.click(buttonTrigger);
    const modalContent = screen.getByText("Content");
    expect(modalContent).toBeVisible();
  });
});
