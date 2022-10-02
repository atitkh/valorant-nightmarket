import React, { useState } from 'react';
import { LoginForm } from './components';
import { StoreList } from './pages';

function App() {
  const [user, setUser] = useState({ username: "", accessToken: "", entitlementsToken: "", userID: "", region: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        if (data.access_token) {
          setUser({ username: data.username, accessToken: data.access_token, entitlementsToken: data.entitlements_token, userID: data.user_id, region: data.region });
        } else {
          setError(data.message);
          setLoading(false);
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  const Logout = () => {
    setUser({ username: "", accessToken: "", entitlementsToken: "", userID: "", region: "" });
    setLoading(false);
  }

  return (
    <div className="App">
      {(user.accessToken !== "") ? (
        <StoreList user={JSON.stringify(user)} Logout={Logout} />
      ) : (
        <LoginForm Login={Login} error={error} setLoading={setLoading} loading={loading} />
      )}
    </div>
  );
}

export default App;
