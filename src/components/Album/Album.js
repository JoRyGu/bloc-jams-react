import React, { Component } from 'react';
import albumData from '../../data/albums';
import PlayerBar from '../PlayerBar/PlayerBar';
import './Album.css';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });

        this.state ={
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            isPaused: false,
            songCurrentlyHovered: null,
            currentTime: 0,
            currentVolume: 80,
            duration: album.songs[0].duration
        }

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeUpdate: e => {
                this.setState({currentTime: this.audioElement.currentTime});
            },
            durationChange: e => {
                this.setState({duration: this.audioElement.duration});
            }
        }
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeUpdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationChange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeUpdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationChange);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true, isPaused: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false, isPaused: true });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song) }
            this.play();
        }
    }

    handleMouseEnter(song) {
        this.setState({songCurrentlyHovered: song});
    }

    handleMouseLeave(song) {
        this.setState({songCurrentlyHovered: null});
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length -1, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({currentTime: newTime});
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({currentVolume: newVolume});
    }

    setIcon(song, index) {
        if (this.state.songCurrentlyHovered === song) {
            return <ion-icon name="play" />
        } else if (this.state.currentSong === song && this.state.isPlaying) {
            return <ion-icon name="pause" />
        } else if (this.state.currentSong === song && this.state.isPaused) {
            return <ion-icon name="play" />
        } 
        else {
            return <span>{index + 1}</span>
        }
    }

    formatTime(num) {
        if (typeof num !== "number") {
            return '-:--';
        }

        let minutes = Math.floor(num/ 60).toString();
        let seconds = Math.floor(num % 60).toString();
        if (seconds.length < 2) {
            seconds = "0" + seconds;
        }
        return `${minutes}:${seconds}`;
    }

    render() {
        return (
            <section className="album">
                <div className="full-album-detail">
                <img id="album-cover-art" src={ this.state.album.albumCover } />
                    <div className="publish-info-plus-songs">
                        <section id="album-info">
                            <div className="album-details">
                                <h1 id="album-title">{ this.state.album.title }</h1>
                                <h2 className="artist">{ this.state.album.artist }</h2>
                                <div id="release-info">{ '©' + this.state.album.releaseInfo }</div>
                            </div>
                        </section>
                        <table id="song-list">
                            <colgroup>
                                <col id="song-number-column" />
                                <col id="song-title-column" />
                                <col id="song-duration-column" />
                            </colgroup>
                            <tbody>
                                { this.state.album.songs.map((song, index) => {
                                    return (
                                        <tr key={ index } 
                                        className="song" 
                                        onClick={ () => this.handleSongClick(song) } 
                                        onMouseEnter={ () => this.handleMouseEnter(song) } 
                                        onMouseLeave={ () => this.handleMouseLeave(song) }>
                                            <td id="index">{ this.setIcon(song, index) }</td>
                                            <td id="song-title">{ song.title }</td>
                                            <td id="song-length">{ this.formatTime(parseFloat(song.duration)) }</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <PlayerBar 
                isPlaying={this.state.isPlaying} 
                currentSong={this.state.currentSong}
                currentTime={this.state.currentTime}
                currentVolume={this.state.currentVolume}
                songDuration={this.state.duration}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
                formatTime={this.formatTime}
                />
            </section>
        );
    }
}

export default Album;