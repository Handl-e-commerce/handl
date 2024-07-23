import { createBrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import { Login } from './routes/Login/Login';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export {Router};