import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

function ToggleButton({ onClick }) {
    const [isToggled, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!isToggled);
        onClick(); // Invoke the callback to toggle the sidebar
    };
    return (
        <button onClick={handleToggle}>
            {isToggled ? (
                <Icon.Justify className="toggle-icons" width={30} height={30} />
            ) : (
                <Icon.XLg className="sidebar-icons" width={30} height={30} />
            )}
        </button>
    );
}

export default ToggleButton;
