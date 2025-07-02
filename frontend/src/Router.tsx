import { createBrowserRouter, Outlet } from 'react-router-dom';
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
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SavedVendors } from './routes/SavedVendors/SavedVendors';
import { Blog } from './routes/Blog/Blog';
import { BlogPost } from './components/BlogPost/BlogPost';
import { Pricing } from './routes/Pricing/Pricing';

import './App/App.css';

function Layout(): JSX.Element {
    return (
        <div className="App">
            <Header />
            <div className="App-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

const Router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
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
                path: "/results/:category",
                element: <Results />,
            },
            {
                path: "/verify",
                element: <Verify />,
            },
            {
                path: "/reset/redirect",
                element: <Redirect />,
            },
            {
                path: "/reset/password",
                element: <Password />,
            },
            {
                path: "/me/saved-vendors",
                element: <SavedVendors/>
            },
            {
                path: "/blog",
                element: <Blog />,
                children: [
                    {
                        path: "/blog/:title",
                        element: <BlogPost />
                    }
                ]
            },
            {
                path: "/pricing",
                element: <Pricing />,
            },
            {
                path: "/subscribe",
            }
        ],
    },
]);

export {Router};