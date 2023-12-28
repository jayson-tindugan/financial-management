import Toggle from "./ToggleButton.jsx";
import BITS_LOGO from "../../assets/img/BITS_LOGO.png";
import LogoutButton from "./Logout.jsx";

function Header({ toggleSidebar }) {
    return (
        <header className="global-header">
            <div className="left-header-content">
                <div className="toggle-btn">
                    <Toggle onClick={toggleSidebar} />
                </div>
                <div className="vertical-divider"></div>
                <div className="logo">
                    <img
                        src={BITS_LOGO}
                        style={{ padding: "2px 0 2px 10px" }}
                        alt="LOGO"
                    />
                </div>
            </div>
            <div className="right-header-content">
                <div className="vertical-divider ml-auto"></div>
                <LogoutButton />
            </div>
        </header>
    );
}

export default Header;
