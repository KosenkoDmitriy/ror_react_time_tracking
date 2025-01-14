import React, { useState } from "react";

import { TeamDetailsContext } from "context/TeamDetailsContext";

import Header from "./Layout/Header";
import OutletWrapper from "./Layout/OutletWrapper";
import SideNav from "./Layout/SideNav";
import { PersonalDetailsState } from "./PersonalDetails/PersonalDetailsState";

const TeamDetails = () => {
  const [details, setDetails] = useState({
    personalDetails: PersonalDetailsState,
    employmentDetails: [],
    documentDetails: {},
    deviceDetails: {},
    compensationDetails: {},
    reimburstmentDetails: {},
  });

  const updateDetails = (key, payload) => {
    setDetails({ ...details, [`${key}Details`]: payload });
  };

  return (
    <TeamDetailsContext.Provider
      value={{
        details,
        updateDetails,
      }}
    >
      <Header />
      <div className="mt-6 mb-10 flex">
        <SideNav />
        <OutletWrapper />
      </div>
    </TeamDetailsContext.Provider>
  );
};
export default TeamDetails;
