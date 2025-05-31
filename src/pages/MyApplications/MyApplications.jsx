import React, { Suspense } from "react";
import ApplicationList from "./ApplicationList";
import useAuth from "../../hooks/useAuth";

// 4.11 as we are using fetch we use {credentials: "include",} or if u user axios use "withCredentials: true". after the fetch url. Note: as the method is app.get("/applications",...), so by default it will be a get method but in put or patch then method should be mentioned "method: PUT"  for the fetch method. Now reload the my Application in browser and see the server u will get the token.
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
