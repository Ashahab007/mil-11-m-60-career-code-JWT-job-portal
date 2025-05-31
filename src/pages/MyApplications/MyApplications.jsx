import React, { Suspense } from "react";
import ApplicationList from "./ApplicationList";
import useAuth from "../../hooks/useAuth";

// 4.12 as we are using fetch we use {credentials: "include",} after the url. Note: as the method is get so by default it will be a get method but in put or patch then method should be "method: PUT" included for the fetch method. Now reload the my Apllication in browser and see the server u will get the token.
const applicationsPromise = (email) => {
  return fetch(`http://localhost:3000/applications?email=${email}`, {
    credentials: "include",
  }).then((res) => res.json());
};

const MyApplications = () => {
  const { user } = useAuth();
  return (
    <Suspense fallback={"Your Application is loading . . ."}>
      <ApplicationList
        applicationsPromise={applicationsPromise(user.email)}
      ></ApplicationList>
      ;
    </Suspense>
  );
};

export default MyApplications;
