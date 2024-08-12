/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import './assets/css/player.css';

import Timestamp from './timestamp';

class Spotify {
    constructor() {
        this.playing = false;
        this.song = {
            track: {
                title: 'Nothing playing',
                url: null,
            },
            album: {
                title: 'Nothing playing',
                /** @type {Array<{name: string, image: string, url: string}>} */
                artists: [],
                image: null,
            },
            /** @type {Array<{name: string, image: string, url: string}>} */
            artists: [],
            meta: {
                progress: {
                    start: 0,
                    end: 0,
                    current: 0,
                    percentage: 0,
                },
            },
        };
    }
    setPlaying = playing => Object.assign(this, { playing });
    setTrack = song => Object.assign(this, { song });
}

export default function Player() {
    const [playing, setPlaying] = useState({
        track: { title: "Nothing playing", url: null },
        album: { title: "Nothing", artists: [], image: "https://via.placeholder.com/300" },
        artists: [{ name: "No One", image: "https://via.placeholder.com/300", url: "https://open.spotify.com/artist/0" }],
        meta: { progress: { start: 0, end: 0, current: 0, percentage: 0 } }
    });

    useEffect(() => {
        const load = async () => {
            const data = await fetch('https://spotify.thefemdevs.com/playing/ben')
            const { isPlaying, playing: track } = await data.json();
            const spotify = new Spotify();
            spotify.setPlaying(isPlaying);
            spotify.setTrack(track);
            if (!isPlaying) return
            setPlaying(spotify.song);
        }
        load();
        const interval = setInterval(load, 1_000);
        return () => clearInterval(interval);
    })

    const LF = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });
    const NFR = / *\(.*(ft|feat|with).*\)/gmi;

    return (
        <div
            className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-xl flex now-playing gap-8 md:max-w-6xl"
        >
            <style>
                {`.album-cover::before {background-image:url(${playing.album.image || 'https://via.placeholder.com/300'});}`}
            </style>
            <div className="album-cover">
                <img
                    className="rounded-lg w-full object-cover"
                    id="album-cover"
                    src={playing.album.image || 'https://via.placeholder.com/300'}
                    alt={playing.album.title.replace(NFR, '') || 'None'}
                />
            </div>
            <div className="song-info p-4 self-center gap-4">
                <div className="text-center md:text-left gap-2">
                    <h2
                        className="text-gray-300 text-2xl font-semibold"
                        id="song-title"
                    >
                        {playing.track.title.replace(NFR, '') || 'Nothing'}
                    </h2>
                    <p
                        className="text-gray-400 text-lg"
                        id="artist-name"
                    >
                        {LF.format(playing.artists.map(a => a.name || 'None')).replace(NFR, '') || 'No One'}
                    </p>
                </div>
                <div className="my-4 gap-4">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={playing.meta.progress.percentage} />
                    </Box>
                    <div className="flex justify-between text-lg text-gray-400 mt-1">
                        <Timestamp time={playing.meta.progress.current} />
                        <Timestamp time={playing.meta.progress.end - playing.meta.progress.start} />
                    </div>
                </div>
            </div>
        </div>
    );
}