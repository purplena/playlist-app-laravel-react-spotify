import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ClientRoot from './ClientRoot';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LandingPage from '../pages/LandingPage';
import SearchSong from '../pages/SearchSong';
import RequestedSongs from '../pages/RequestedSongs';
import SignUp from '../pages/SignUp';
import CompanySignUp from '../pages/CompanySignUp';
import CompanyRoot from './CompanyRoot';
import CompanyLogin from '../pages/CompanyLogin';
import CompanyHome from '../pages/CompanyHome';
import ProtectedCompanyRoot from './ProtectedCompanyRoot';
import CompanyRequestedSongs from '../pages/CompanyRequestedSongs';
import CompanyBlacklist from '../pages/CompanyBlacklist';
import ErrorPage from './ErrorPage';
import CompanyEdit from '../pages/CompanyEdit';
import CompanyInfo from '../pages/CompanyInfo';
import CompanyMenu from '../pages/CompanyMenu';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        children: [
          {
            path: '/',
            element: <LandingPage />,
          },
        ],
      },
      {
        path: '/',
        element: <ClientRoot />,
        children: [
          {
            path: '/',
            element: <LandingPage />,
          },
          {
            path: '/:companySlug',
            element: <Home />,
          },
          {
            path: '/:companySlug/songs',
            element: <RequestedSongs />,
          },
          {
            path: '/:companySlug/songs/search',
            element: <SearchSong />,
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/signup',
            element: <SignUp />,
          },
        ],
      },
      {
        path: '/manager',
        element: <CompanyRoot />,
        children: [
          {
            path: '',
            element: <ProtectedCompanyRoot />,
            children: [
              {
                path: '',
                element: <CompanyHome />,
              },
              {
                path: 'entreprise',
                element: <CompanyInfo />,
              },
              {
                path: 'entreprise/modifier',
                element: <CompanyEdit />,
              },
              {
                path: 'songs',
                element: <CompanyRequestedSongs />,
              },
              {
                path: 'blacklist',
                element: <CompanyBlacklist />,
              },
              {
                path: 'carte',
                element: <CompanyMenu />,
              },
            ],
          },
          {
            path: 'login',
            element: <CompanyLogin />,
          },
          {
            path: 'registration',
            element: <CompanySignUp />,
          },
        ],
      },
    ],
  },
]);
