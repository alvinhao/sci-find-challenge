import React from "react";
import { cleanup, render } from "@testing-library/react";
import ProfileForm from "../Profile/profile";
import { ProfileBase } from "../Profile";
import Firebase from "../Firebase/firebase";

jest.mock("../Firebase/firebase", () => {
  return jest.fn().mockImplementation(() => {
    return {
      user: () => {
        return {
          on: () => {
            return {
              uid: "456",
              email: "alvin@123.com",
              serviceA: true,
              serviceB: false,
            };
          },
        };
      },
    };
  });
});

afterEach(cleanup);

it("Profile edit button disabled for unauthed user", () => {
  const { getByText } = render(
    <ProfileForm
      isAuthed={false}
      onSubmitChange={() => {}}
      user={{ email: "alvin@123.com", serviceA: true, serviceB: false }}
    ></ProfileForm>
  );

  expect(getByText("Edit")).toHaveAttribute("disabled");
});

it("Profile form not loading when uid don't match", () => {
  const { queryByTestId, getByText } = render(
    <ProfileBase
      match={{ params: { id: "123" } }}
      firebase={new Firebase()}
    ></ProfileBase>
  );

  expect(queryByTestId(/isAuthed/i)).toBeNull();
  expect(getByText("Please Sign in")).toBeTruthy();
});
