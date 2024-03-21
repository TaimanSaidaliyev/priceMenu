import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EstablishmentMenuPage from './pages/EstablishmentMenuPage';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import EstablishmentInfoPage from './pages/EstablishmentInfoPage';
import MenuEditPage from './pages/MenuEditPage';

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
    path: 'menu/edit/',
    element: <MenuEditPage/>
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
