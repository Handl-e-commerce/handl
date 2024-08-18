import { createBrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import { Login } from './routes/Login/Login';
import { SignUp } from './routes/SignUp/SignUp';
import { AboutUs } from './routes/AboutUs/AboutUs';
import { ContactUs } from './routes/ContactUs/ContactUs';
import { Results } from './routes/Results/Results';
import { Verify } from './routes/Verify/Verify';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/about-us",
        element: <AboutUs />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/contact-us",
        element: <ContactUs />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/results",
        element: <Results />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/verify",
        element: <Verify />,
        errorElement: <ErrorPage />,
    }
]);

export {Router};