import { createBrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home/Home';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }
]);

export {Router};