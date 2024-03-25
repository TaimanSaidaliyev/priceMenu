import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EstablishmentMenuPage from './pages/EstablishmentMenuPage';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import EstablishmentInfoPage from './pages/EstablishmentInfoPage';
import SettingsMenuPage from './pages/SettingsMenuPage';
import SettingsGeneralPage from './pages/SettingsGeneralPage';
import ListForWaiterPage from './pages/ListForWaiterPage';
import AuthorizationPage from './pages/AuthorizationPage';


const router = createBrowserRouter([
  {
    path: "establishment/:establishment_id",
    element: <EstablishmentMenuPage/>,
  },
  {
    path: "/",
    element: <MainPage/>
  },
  {
    path: "*",
    element: <NotFound/>
  },
  {
    path: 'establishment/:establishment_id/info/',
    element: <EstablishmentInfoPage/>
  },
  {
    path: 'settings/menu/',
    element: <SettingsMenuPage/>
  },
  {
    path: 'settings/general/',
    element: <SettingsGeneralPage />
  },
  {
    path: 'list_for_waiter/',
    element: <ListForWaiterPage/>
  },
  {
    path: 'login/',
    element: <AuthorizationPage/> 
  },

]);

function App() {
 return(
  <>
    <RouterProvider router={router} />
  </>
 );
}

export default App
