import React from "react";
import { Outlet } from "react-router-dom";
import MoreIcon from "@mui/icons-material/More";
import AboutNavigation from "../../components/navigations/AboutNavigation";

function About() {
    return (
        <div className="pages-container">
            <div className="pages-row">
                <div className="about-ribbon">
                    <MoreIcon
                        className={click ? "active" : ""}
                        onClick={handleClick}
                    />
                </div>
                <div className="pages-col-3">
                    <div
                        className={
                            click
                                ? "about-navigation-container active"
                                : "about-navigation-container"
                        }
                    >
                        <AboutNavigation />
                    </div>
                </div>
                <div className="pages-col-9">
                    <div className="about-outlet-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
