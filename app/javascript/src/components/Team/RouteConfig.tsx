import React from "react";

import { Route, Routes } from "react-router-dom";

// import Details from "./Details";
// import CompensationDetails from "./Details/CompensationDetails";
// import DeviceDetails from "./Details/DeviceDetails";
// import DocumentDetails from "./Details/DocumentDetails";
// import EmploymentDetails from "./Details/EmploymentDetails";
// import PersonalDetails from "./Details/PersonalDetails";
// import ReimburstmentDetails from "./Details/ReimburstmentDetails";
// import EmploymentEdit from "./Details/PersonalDetails/Edit";
import List from "./List";

const RouteConfig = () => (
  <Routes>
    <Route element={<List />} path="*" />{" "}
    {/* TODO: set to index and display personalDetails */}
    {/* <Route path=":memberId" element={<Details />}>
        <Route index element={<PersonalDetails />} />
        <Route path="devices" element={<DeviceDetails />} />
        <Route path="employment" element={<EmploymentDetails />} />
        <Route path="compensation" element={<CompensationDetails />} />
        <Route path="documents" element={<DocumentDetails />} />
        <Route path="reimburstment" element={<ReimburstmentDetails />} />
        <Route path="edit" element={<EmploymentEdit />} />
    </Route> */}
  </Routes>
);

export default RouteConfig;
