import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import RecordsPage from './components/records/RecordsPage';
import Layout from './components/shared/Layout';
import { refreshAccessToken } from './api/apiLogic';
import { BoxWrapper } from './components/shared/styles/wrappers';
import { Loading } from './components/shared/styles/inputs';
import { RecordsImage } from './components/shared/styles/images';
import ChunksList from './components/chunks/list/ChunksList';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import PublicRecordsPage from './components/records/PublicRecordsPage';
import UserProfilePage from './components/user/UserProfilePage';
import ChunkDetails from './components/chunks/list/item/ChunkDetails';

const SafeSoundLogo = new URL('./assets/images/SafeSound.png', import.meta.url)
  .href;

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        let token: string | null = localStorage.getItem('accessToken');

        if (!token) {
          token = await refreshAccessToken();
          if (token) {
            localStorage.setItem('accessToken', token);
          }
        }

        setAccessToken(token);
      } catch (error) {
        console.error('Failed to fetch access token:', error);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  const handleAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
  };

  if (loading) {
    return (
      <div>
        <BoxWrapper>
          <Loading>Loading...</Loading>
        </BoxWrapper>
        <BoxWrapper>
          <RecordsImage src={SafeSoundLogo} alt="SafeSound Logo" />
        </BoxWrapper>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              accessToken ? (
                <Navigate to="/records" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<Login handleAccessToken={handleAccessToken} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/records"
            element={
              accessToken ? (
                <>
                  <Layout />
                  <RecordsPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/records/public"
            element={
              accessToken ? (
                <>
                  <Layout />
                  <PublicRecordsPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/records/:id"
            element={
              accessToken ? (
                <>
                  <Layout />
                  <ChunksList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/records/:recordId/chunks/:chunkId"
            element={
              accessToken ? (
                <>
                  <Layout />
                  <ChunkDetails />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/user/profile"
            element={
              accessToken ? (
                <>
                  <Layout />
                  <UserProfilePage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
