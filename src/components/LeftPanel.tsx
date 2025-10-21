import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function LeftPanelLink({ children, to } : { children? : ReactNode, to : string }) {
    return (
        <Link
            className="px-7 py-3 odd:bg-[#692e2e] even:bg-[#782b2b] hover:bg-[#5e2222] duration-200 ease-in-out"
            to={to}>{children}</Link>
    )
}

export default function LeftPanel() {

    const { userProfile } = useAuth()

    return (
        <nav className='flex-1 mt-10 fixed'>
            <ul className='flex flex-col shadow-[5px_5px_10px_rgba(100,0,0,0.30)]'>
                <LeftPanelLink to="/">
                    Головна
                </LeftPanelLink>
                <LeftPanelLink to={ userProfile ? "/profile" : "/login" }>
                    Профіль
                </LeftPanelLink>
                <LeftPanelLink to="/location">
                    Локації
                </LeftPanelLink>
                <LeftPanelLink to="/model">
                    Моделі управління
                </LeftPanelLink>
                <LeftPanelLink to="/state">
                    Держави
                </LeftPanelLink>
            </ul>
        </nav>
    )
}