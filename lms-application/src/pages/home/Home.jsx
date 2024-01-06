import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavigation from "../../components/navigations/HomeNavigation";
import FooterNavigation from "../../components/navigations/FooterNavigation";

function Home() {
    return (
        <div className="pages-background">
            <div className="pages-container">
                <div className="pages-row">
                    <div className="pages-col-12">
                        <div className="pages-header-container">
                            <HomeNavigation />
                        </div>
                    </div>
                    <div className="pages-col-12">
                        <div className="pages-section-container">
                            <Outlet />
                        </div>
                    </div>
                    <div className="pages-col-12">
                        <div className="pages-footer-container">
                            <FooterNavigation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
