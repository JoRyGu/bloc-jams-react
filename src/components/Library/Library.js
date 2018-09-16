import React, { Component } from 'react';
import albumData from './../../data/albums';
import { Link } from 'react-router-dom';
import './Library.css';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: albumData
        }
    }
    render() {
        return (
            <section className="library">
                {
                    this.state.albums.map( (album, index) =>
                        <Link to={ `/album/${album.slug}` } key={ index } className="library-detail">
                            <img src={ album.albumCover } alt={ album.title } />
                            <div className="title info">{ album.title }</div>
                            <div className="length info">{ album.songs.length } songs</div>
                        </Link>
                       
                    )
                }
            </section>
        );
    }
}

export default Library;