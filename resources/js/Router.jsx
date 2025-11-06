import { createBrowserRouter } from 'react-router-dom';
import CompanyBlacklist from '../pages/CompanyBlacklist';
import CompanyEdit from '../pages/CompanyEdit';
import CompanyHome from '../pages/CompanyHome';
import CompanyInfo from '../pages/CompanyInfo';
import CompanyLogin from '../pages/CompanyLogin';
import CompanyMenu from '../pages/CompanyMenu';
import CompanyRequestedSongs from '../pages/CompanyRequestedSongs';
import CompanySignUp from '../pages/CompanySignUp';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import RequestedSongs from '../pages/RequestedSongs';
import SearchSong from '../pages/SearchSong';
import SignUp from '../pages/SignUp';
import ClientRoot from './ClientRoot';
import CompanyRoot from './CompanyRoot';
import ErrorPage from './ErrorPage';
import ProtectedCompanyRoot from './ProtectedCompanyRoot';
import Root from './Root';

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
            path: '/:companySlug/login',
            element: <Login />,
          },
          {
            path: '/:companySlug/signup',
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
