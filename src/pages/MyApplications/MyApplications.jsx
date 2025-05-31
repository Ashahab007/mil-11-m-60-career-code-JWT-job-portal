import React, { Suspense } from "react";
import ApplicationList from "./ApplicationList";
import useAuth from "../../hooks/useAuth";



//  Note: If u need the data of user.email in other section of website u can export it from here or u can make a folder name api under src folder and create another file applicationsPromise.js then export it from there. this is for large application.
const applicationsPromise = (email) => {
  return fetch(`http://localhost:3000/applications?email=${email}`).then(
    (res) => res.json()
  );
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
