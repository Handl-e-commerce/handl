import { createBrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import { Login } from './routes/Login/Login';
import { SignUp } from './routes/SignUp/SignUp';
import { AboutUs } from './routes/AboutUs/AboutUs';
import { ContactUs } from './routes/ContactUs/ContactUs';
import { Results } from './routes/Results/Results';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/about-us",
        element: <AboutUs />,
    },
    {
        path: "/contact-us",
        element: <ContactUs />,
    },
    {
        path: "/results",
        element: <Results />,
    }
]);

export {Router};