import { Link } from "react-router-dom";
import Logo from "../assets/icon.svg"
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/authContext";
import { photoPlaceholderSrc } from "../services/MainAPI";

export default function Header() {
    const { t, i18n } = useTranslation();
    const { userProfile } = useAuth();

    return (
    <header className="bg-header border-red border-b-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between">
        {/* Лого / Назва */}
        <div className="flex items-end">
            <Link to="/" className="button-bg bg-red duration-200 p-4">
                <img src={Logo} className="max-w-18" />
            </Link>

            <div className="bg-searcher flex ml-8">
                <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 p-2 bg_searcher" viewBox="0 0 64 64" enable-background="new 0 0 64 64"> <g> <path fill="#231F20" d="M62.242,53.757L51.578,43.093C54.373,38.736,56,33.56,56,28C56,12.536,43.464,0,28,0S0,12.536,0,28 s12.536,28,28,28c5.56,0,10.736-1.627,15.093-4.422l10.664,10.664c2.344,2.344,6.142,2.344,8.485,0S64.586,56.101,62.242,53.757z M28,54C13.641,54,2,42.359,2,28S13.641,2,28,2s26,11.641,26,26S42.359,54,28,54z"/> <path fill="#231F20" d="M28,4C14.745,4,4,14.745,4,28s10.745,24,24,24s24-10.745,24-24S41.255,4,28,4z M44,29c-0.553,0-1-0.447-1-1 c0-8.284-6.716-15-15-15c-0.553,0-1-0.447-1-1s0.447-1,1-1c9.389,0,17,7.611,17,17C45,28.553,44.553,29,44,29z"/> </g> </svg>
                <input className="button-bg bg-red duration-200 p-3 border-none outline-none focus:outline-none focus:ring-0" placeholder={t("header.placeholder")} />
            </div>
        </div>

        {/* Навігація */}
        <nav className="flex items-center">
          <div className="flex gap-5 header-element px-10 py-5 rounded-sm">
            <Link to="/library" className="header-link transition">Бібліотека</Link>
            <Link to="/museum" className="header-link transition">Музей</Link>
          </div>
        </nav>

        {userProfile ? (
          <Link to="/profile" className="bg-red button-bg duration-200 px-4 py-2 flex flex-col justify-between items-center text-gray-300">
              <img src={userProfile.avatarSrc || photoPlaceholderSrc} className="h-14 w-14 rounded-xl" alt="photo" />
              {userProfile.username}
          </Link>
        ) : (
            <Link to="/login"className="header-element button-bg duration-200 p-2 hover:py-7 hover:cursor-pointer rounded-sm hover:rounded-none flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z" fill="#000000"/> <path d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z" fill="#000000"/> <path d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z" fill="#000000"/> </svg>
                <span className="mx-5">{t("header.login")}</span>
            </Link>
        )}
        
      </div>
    </header>
  )
}