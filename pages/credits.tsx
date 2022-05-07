import React from "react";

import Copyright from "../components/Copyright";
import MainContainer from "../components/MainContainer";
import CreditsComponent from "../components/Credits";

const Credits = () => {
  return (
    <MainContainer title="Credits">
      <CreditsComponent />
      <Copyright />
    </MainContainer>
  );
};

export default Credits;
