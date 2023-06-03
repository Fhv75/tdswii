import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Page404 from '../Pages/Page404'
import LogoutButton from '../components/LogoutButton';
import NavBar from '../components/NavBar/NavBar';

export default function Router(props) {

    // Se reciben las rutas como propiedades, se mapean
    // y se renderizan en el componente Routes

    const routes = props.routes.map((element) => {
        if (!element.protection) {
            return (
                <Route
                    key={element.path}
                    path={element.path}
                    element={element.component}
                    onEnter={element.onEnter}
                ></Route>
            );
        }
        return (
            <Route key={element.path} element={element.protection}>
                <Route path={element.path} element={element.component}></Route>
            </Route>
        );
    });
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                {routes}
                <Route path='*' element={<Page404 />}></Route>
            </Routes>
            <LogoutButton />
        </BrowserRouter>
    );
}