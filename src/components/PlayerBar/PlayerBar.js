import React, { Component } from 'react';

class PlayerBar extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <ion-icon name="skip-backward" />
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                    { this.props.isPlaying ? <ion-icon name="pause" /> : <ion-icon name="play" /> }
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <ion-icon name="skip-forward" />
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">{this.props.currentTime}</div>
                    <input type="range" 
                    className="seek-bar" 
                    value={(this.props.currentTime / this.props.songDuration) || 0} 
                    max="1"
                    min="0"
                    step="0.01"
                    onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">{this.props.songDuration}</div>
                </section>
                <section id="volume-control">
                    <div className="ion-icon-volume-low">
                        <ion-icon name="volume-low" />
                    </div>
                    <input type="range" className="seek-bar" value="80" />
                    <div className="ion-icon-volume-high">
                        <ion-icon name="volume-high" />
                    </div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;