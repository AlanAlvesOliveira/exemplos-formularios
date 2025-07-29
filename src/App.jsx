import { useState } from 'react';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import LoginWithRefs from './components/LoginWithRefs.jsx';
import StateLogin from './components/StateLogin.jsx';
import SignupWithFormActions from './components/SignupWithFormActions.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' ou 'signup'

  function renderTabContent() {
    switch (activeTab) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'SignupWithFormActions':
        return <SignupWithFormActions />
      case 'LoginWithRefs':
        return <LoginWithRefs />;
      case 'StateLogin':
        return <StateLogin />;
      default:
        throw new Error('tab não encontrada');
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="tabs-container">
          <div className="tabs-header">

            <button
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>

            <button
              className={`tab-button ${activeTab === 'LoginWithRefs' ? 'active' : ''}`}
              onClick={() => setActiveTab('LoginWithRefs')}
            >
              Login Ref
            </button>

            <button
              className={`tab-button ${activeTab === 'StateLogin' ? 'active' : ''}`}
              onClick={() => setActiveTab('StateLogin')}
            >
              Login Custom Hook
            </button>

            <button
              className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>

            <button
              className={`tab-button ${activeTab === 'SignupWithFormActions' ? 'active' : ''}`}
              onClick={() => setActiveTab('SignupWithFormActions')}
            >
              Sign Up Actions
            </button>

          </div>

          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </>
  );
}