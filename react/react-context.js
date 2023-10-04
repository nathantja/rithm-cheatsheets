// demo/user-context/src/userContext.js
import { createContext } from "react";

const userContext = createContext();

export default userContext;


// allows us to use userContext.Provider
// EXAMPLE - LOGICAL, NO PRESENTATION // demo/user-context/src/JoblyApp.js
import { useState } from "react";
import UserPrefForm from "./UserPrefForm";
import JobDetail from "./JobDetail";
import CompanyDetail from "./CompanyDetail";
import userContext from "./userContext";

const DEFAULT_PREFS = {color: "dark", currency: "USD"};

function JoblyApp() {
    const [prefs, setPrefs] = useState(DEFAULT_PREFS);

    function updatePrefs(newPrefs) {
        setPrefs(newPrefs);
    }

    return (
    <userContext.Provider value={{user: null, prefs}}>
      <UserPrefForm submit={updatePrefs} currPrefs={prefs} />
      <JobDetail />
      <CompanyDetail />
    </userContext.Provider>
  );
}


// demo/user-context/src/JobDetail.js
import { useContext } from "react";
import userContext from "./userContext";

function JobDetail({ title, description, salary }) {
  const { prefs } = useContext(userContext);

  return (
    <div>
      <h2>Fake Job!</h2>
      <p>You should apply! It pays lots of {prefs.currency}.</p>
    </div>
  )
}


// Storing User in Context
function JoblyApp() {
  // same as before but also...

  const [user, setUser] = useState(null);

  function login({username, password}) {
    // lots of logic here, but then ...
    const userFromAPI = {get_this_from_api};
    setUser(userFromAPI);
  }

  return (
  <userContext.Provider value={{user, prefs}}>
    {/* same, plus ... */}
    <LoginForm submit={login} />
  </userContext.Provider>
  );
}