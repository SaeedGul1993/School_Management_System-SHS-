import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPageScreens/LandingPage/LandingPage';
import AdminPanel from './AdminDashoardPageScreens/AdminPanel/AdminPanel';
import { store, persistedStore } from './Redux/Store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <BrowserRouter>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" component={AdminPanel} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
