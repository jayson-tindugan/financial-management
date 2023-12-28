import React from "react";
import * as Icon from "react-bootstrap-icons";

function ProfileBody({ label, value, showIcon, onClick }) {
    const handleIconClick = () => {
        if (onClick && typeof onClick === "function") {
            onClick();
        }
    };

    const renderIcon = () => {
        if (
            label.toUpperCase() === "ROLE" ||
            label.toUpperCase() === "STATUS"
        ) {
            return null; // Exclude icons for Role and Status fields
        } else {
            return (
                <button onClick={handleIconClick}>
                    <Icon.PencilFill className="sidebar-icons" />
                </button>
            );
        }
    };

    return (
        <div className="profile-body">
            <label htmlFor={label}>{label}:</label>
            <div className="profile-info d-flex justify-content-between">
                <p className="m-0">{value}</p>
                {showIcon && renderIcon()}
            </div>
        </div>
    );
}

export default ProfileBody;
