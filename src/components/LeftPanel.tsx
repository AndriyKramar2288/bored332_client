import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function LeftPanelLink({ children, to } : { children? : ReactNode, to : string }) {
    return (
        <li className="px-7 py-3 odd:bg-[#692e2e] even:bg-[#782b2b] hover:bg-[#5e2222] duration-200 ease-in-out text-center">
            <Link to={to}>{children}</Link>
        </li>
    )
}

export default function LeftPanel() {
    return (
        <nav className='flex-1'>
            <ul className='flex flex-col pt-10'>
                <LeftPanelLink to="/">
                    Головна
                </LeftPanelLink>
                <LeftPanelLink to="/">
                    Головна
                </LeftPanelLink>
                <LeftPanelLink to="/">
                    Головна
                </LeftPanelLink>
            </ul>
        </nav>
    )
}