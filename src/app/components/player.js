/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import './assets/css/player.css';

import Timestamp from './timestamp';

export default function Player() {
    const [playing, setPlaying] = useState({
        "track": {
            "title": "Animals",
            "url": "https://open.spotify.com/track/5s8TNhF23nv2Pumf0JTe2i"
        },
        "album": {
            "title": "V (Deluxe)",
            "artists": [
                {
                    "name": "Maroon 5",
                    "image": "https://i.scdn.co/image/ab6761610000e5ebf8349dfb619a7f842242de77",
                    "url": "https://open.spotify.com/artist/04gDigrS5kc9YWfZHwBETP"
                }
            ],
            "image": "https://i.scdn.co/image/ab67616d0000b273df8c14c6ac24390cffd9fea4"
        },
        "artists": [
            {
                "name": "Maroon 5",
                "image": "https://i.scdn.co/image/ab6761610000e5ebf8349dfb619a7f842242de77",
                "url": "https://open.spotify.com/artist/04gDigrS5kc9YWfZHwBETP"
            }
        ],
        "meta": {
            "progress": {
                "start": 1723421764204,
                "end": 1723421995217,
                "current": 80779,
                "percentage": 34.9672962127672
            }
        }
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await fetch('https://spotify.thefemdevs.com/playing/ben');
            const { isPlaying, playing: track } = await data.json();
            if (isPlaying) setPlaying(track);
        }, 1000);
        fetch('https://spotify.thefemdevs.com/playing/ben').then(async (data) => {
            const { isPlaying, playing: track } = await data.json();
            if (isPlaying) setPlaying(track);
        })
        return () => clearInterval(interval);
    })

    return (
        /*
            Make a sort of music player display (without the media controls)
            Ensure that there is a progress bar that shows the current progress of the song with timestamps
            at the beginning and at the end
            Include the album image as well
            The media player should have the following qualities:
            - Centered both vertically and horazontally
            - On mobile, the layout should be vertical with the album image on top and the progress bar and other details below
            - On desktop, the layout should be horizontal with the album image on the left and the progress bar and other details on the right
            - The media player should have a border radius of 10px, background color of #1F1F1F, and a box shadow
            - The album image should have a border radius of 10px
            - The gap between the album image and the other information should be 32px
            - The whole media player should have a padding of 16px
            - The album cover should have a backdrop blur to give the illusion that the image is glowing (blur of 10px)
            - The album image itself should not be blurry, but only the blur BEHIND the image
            - The progress bar should have a height of 4px and a border radius of 2px
            - The width of the media player should not exceed 500px
            - All of this should be done in pure HTML with Tailwind CSS
        */
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-xl flex now-playing gap-8 md:max-w-6xl">
                <style>
                    {(() => {
                        const AlbumCSS = `
                        .album-cover::before {
                            background-image: url('https://via.placeholder.com/300');
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background-size: cover;
                            background-position: center;
                            filter: blur(15px);
                            z-index: 0;
                        }`;
                        if (playing.album.image) return AlbumCSS.replace('https://via.placeholder.com/300', playing.album.image);
                        return AlbumCSS;
                    })()}
                </style>
                <div className="album-cover">
                    <img className="rounded-lg w-full object-cover" id="album-cover" src={playing.album.image} alt={playing.album.title} />
                </div>
                <div className="song-info p-4 self-center gap-4">
                    <div className="text-center md:text-left gap-2">
                        <h2 className="text-gray-300 text-2xl font-semibold" id="song-title">{playing.track.title}</h2>
                        <p className="text-gray-400 text-lg" id="artist-name">{playing.artists[0].name}</p>
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