import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AvatarStack from "./AvatarStack";
import { users } from "./AvatarStack.playground";

describe("Avatar", () => {
  it("should render the component without crashing", () => {
    render(<AvatarStack avatarSize="md" users={users} />);
  });

  it("should render a stack of avatars from an array of 8 children, and display a sum of the remaining hidden avatars based on the limit prop", () => {
    render(<AvatarStack avatarSize="md" users={users} limit={4} />);
    const sumOfHiddenAvatars = screen.getByText("+4");
    expect(sumOfHiddenAvatars).toBeInTheDocument();
  });
});
