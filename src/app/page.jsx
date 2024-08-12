'use client';
import Player from "./components/player";

export default function Page() {
    return (
        <body>
            <div className="flex items-center justify-center min-h-screen">
                <Player />
            </div>
        </body>
    );
}