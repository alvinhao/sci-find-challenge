import React from "react";
import styled from "styled-components";

const StyledProfileForm = styled.div`
  margin: 0 auto;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ProfileForm = (props) => {
  const { user, isAuthed } = props;
  return (
    <StyledProfileForm>
      <div>
        <label>Emails:</label>
        <input placeholder={user.email} disabled={isAuthed}></input>
      </div>
      <div>
        <input
          type="checkbox"
          checked={user.servicesA}
          disabled={isAuthed}
        />
        <label>ServiceA</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={user.servicesB}
          disabled={isAuthed}
        />
        <label>ServiceB</label>
      </div>
    </StyledProfileForm>
  );
};

export default ProfileForm;
