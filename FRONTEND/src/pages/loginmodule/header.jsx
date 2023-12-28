import BITS_LOGO from "../../assets/img/BITS_LOGO.png";

function Header() {
    return (
        <header className="Login-Header">
            <div className="login-header-brand">
                <h3>Financial Management System</h3>
                <img
                    src={BITS_LOGO}
                    style={{ width: "auto", height: "50px" }}
                    alt="BITS LOGO"
                />
            </div>
        </header>
    );
}

export default Header;
