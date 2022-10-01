import React, { useState } from 'react';
import { LoginForm } from './components';
import { StoreList } from './pages';

function App() {
  const [user, setUser] = useState({username: "", accessToken: "", entitlementsToken: "", userID : ""});
  const [error, setError] = useState("");

  const Login = details => {
    // make api call to check user details
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: details.username, password: details.password })
    };

    fetch('https://api.atitkharel.com.np/valorant/auth/', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          setUser({ username: details.username, accessToken: data.accessToken, entitlementsToken: data.entitlementsToken, userID: data.userID });
        } else {
          setError(data.message);
        }
      });
  }

  const Logout = () => {
    setUser({username: "", accessToken: "", entitlementsToken: "", userID : ""});
  }

  return (
    <div className="App">
      {(user.accessToken !== "") ? (
        <StoreList user={JSON.stringify(user)} Logout={Logout} />
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
