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
                        <h2>Map your class!</h2>
                        <br></br>
                        <h3>Create interactive lessons and generate a living document for your courses</h3>
                        <br></br>
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

