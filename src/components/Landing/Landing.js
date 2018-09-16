import React from 'react';
import './Landing.css';
import assets from '../../data/assets';

const userPhoto = assets.user;
const choicePhoto = assets.choice;
const unlimitedPhoto = assets.unlimited;
const mobilePhoto = assets.mobile;

const landing = () => {
    return (
        <section className="landing">
            <div className="landing-intro">
                <div className="header-detail">
                    <h1 className="site-title">Bloc Jams</h1>
                    <h1 className="hero-title">Turn the music up!</h1>
                </div>
            </div>
            <section className="selling-points">
                <div className="choose">
                    <img src={choicePhoto} alt="photo of users picking their music" className="choicePhoto" />
                    <div className="choose-details">
                        <h2 className="point-title">Choose your music</h2>
                        <p className="point-description">The world is full of music!</p>
                        <p className="point-description">Why should you have to listen to music that someone else chose?</p>
                    </div>
                </div>
                <div className="unlimited">
                    <div className="unlimited-details">
                        <h2 className="point-title">Unlimited streaming, Ad-free</h2>
                        <p className="point-description">No arbitrary limits. No distractions.</p>
                    </div>
                    <img src={unlimitedPhoto} alt="person listening to unlimited streaming" className="unlimitedPhoto" />
                </div>
                <div className="mobile">
                    <img src={mobilePhoto} alt="phone with app on it sitting on desk" className="mobilePhoto" />
                    <div className="mobile-details">
                        <h2 className="point-title">Mobile enabled</h2>
                        <p className="point-description">Listen to your music on the go.</p>
                        <p className="point-description">This streaming service is available on all mobile platforms.</p>
                    </div>
                </div>
            </section>          
        </section>
    );
}

export default landing;