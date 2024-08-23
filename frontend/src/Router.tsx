import { createBrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import { Login } from './routes/Login/Login';
import { SignUp } from './routes/SignUp/SignUp';
import { AboutUs } from './routes/AboutUs/AboutUs';
import { ContactUs } from './routes/ContactUs/ContactUs';
import { Results } from './routes/Results/Results';
import { Verify } from './routes/Verify/Verify';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { Redirect } from './routes/Reset/Redirect';
import { Password } from './routes/Reset/Password';

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
    },
    {
        path: "/reset/redirect",
        element: <Redirect />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/reset/password",
        element: <Password />,
        errorElement: <ErrorPage />,
    }
]);

export {Router};