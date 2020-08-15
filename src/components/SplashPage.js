import React from 'react';
import '../styles/splashpage.css';
import { Button } from 'reactstrap';

const SplashPage = () => {
    return (
        <div className="home-page-background">
            <div className={"container-fluid p-0"}>
                <div className="row">
                    <div className="intro-text-container" >
                        <h1 className="bold-font">MarginMap</h1>
                        <br></br>
                        <h2 className="bold-font">Group annotation application for virtual learning</h2>
                        <br></br>
                        <h3 className="bold-font">More text</h3>
                        <br></br>
                        <h3 className="bold-font">More</h3>
                        <br></br>
                        <h3 className="bold-font">Last bit</h3>

                        <div className="row subRow" id="home-page-buttons">
                            <div className="learn-more">
                                <Button >Learn More</Button>
                            </div>
                            <div className="mailing-list">
                                <Button className="btn btn-primary">Join Our Mailing List</Button>
                            </div>
                            <div className="sign-up">
                                <Button className="btn btn-primary">Sign Up</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;

