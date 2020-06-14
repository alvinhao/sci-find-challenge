import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { services } from "../../constants/services";

const StyledProfileForm = styled.div`
  margin: 0 auto;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ProfileForm = (props) => {
  const { user, isAuthed, onSubmitChange } = props;
  const [editing, setEditing] = useState(false);
  const [profileUser, setProfileUser] = useState(user);

  const onValueChange = useCallback(
    (event) => {
      setProfileUser({
        ...profileUser,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      });
    },
    [setProfileUser, profileUser]
  );
  return (
    <StyledProfileForm>
      <div>
        <label>Emails:</label>
        <input
          name="email"
          value={profileUser.email}
          disabled={!editing}
          onChange={onValueChange}
        ></input>
      </div>
      <div>
        <input
          type="checkbox"
          name={services.SERVICE_A}
          checked={profileUser.serviceA}
          disabled={!editing}
          onChange={onValueChange}
        />
        <label>ServiceA</label>
      </div>
      <div>
        <input
          type="checkbox"
          name={services.SERVICE_B}
          checked={profileUser.serviceB}
          disabled={!editing}
          onChange={onValueChange}
        />
        <label>ServiceB</label>
      </div>
      <button
        disabled={!isAuthed}
        onClick={() => {
          setEditing(!editing);
          editing && setProfileUser(user);
        }}
      >
        {editing ? "Cancel" : "Edit"}
      </button>
      <button
        disabled={!editing}
        onClick={() => {
          setEditing(false);
          onSubmitChange(user);
        }}
      >
        Submit
      </button>
    </StyledProfileForm>
  );
};

export default ProfileForm;
