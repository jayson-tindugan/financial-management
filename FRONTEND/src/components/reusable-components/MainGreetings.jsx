import React from "react";
import LoginDetails from "./LoginDetails.jsx";
import * as Icon from "react-bootstrap-icons";

function MainGreetings() {
    const accountDetails = LoginDetails();
    return (
        <div className="greeting-section">
            {/* Greetings */}
            <div className="greetings">
                <Icon.PersonFill width={40} height={40} />
                <h4>
                    Hi{" "}
                    <b>
                        {accountDetails.firstName +
                            " " +
                            accountDetails.lastName +
                            "!"}
                    </b>
                </h4>
            </div>
            {/* Org.Name */}
            <div className="org-name">
                <h4>Builders of Innovative Technologist Society</h4>
            </div>
        </div>
    );
}

export default MainGreetings;
