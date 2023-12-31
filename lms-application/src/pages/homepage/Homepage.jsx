import React, { useEffect } from "react";
import "./homepage.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Cube from "../../components/animation/Cube";

function Homepage() {
    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div className="pages-col-12">
            <div className="pages-row home-hero">
                <div className="pages-col-7">
                    <div className="hero-details">
                        <h1
                            data-aos="fade-right"
                            data-aos-offset="300"
                            data-aos-duration="2500"
                            data-aos-easing="ease-in-sine"
                        >
                            Dive into Math's Ocean of Possibilities!
                        </h1>
                        <p
                            data-aos="fade-right"
                            data-aos-duration="2000"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine"
                        >
                            Embark on an adventure where the boundless depths of
                            mathematics meet the endless expanse of the ocean.
                            Discover the synergy between numbers and waves,
                            unlocking a world of infinite possibilities waiting
                            to be explored.
                        </p>
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-sine"
                            className="button-holder"
                        >
                            <Link to="/courses">
                                <button className="hb-one">
                                    SEE OUR COURSES
                                </button>
                            </Link>
                            <Link to="/enroll">
                                <button className="hb-two">ENROLL NOW</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="pages-col-5">
                    <div
                        className="hero-img"
                        data-aos="zoom-in"
                        data-aos-duration="3000"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                    >
                        <Cube />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
