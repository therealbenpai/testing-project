'use client';
import Player from "./components/player";
import Header from "./components/header";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <>
            <Header
                title="Benpai's Official Website"
                url="https://ben.thefemdevs.com"
                canonical="https://ben.thefemdevs.com"
                description="The official website of Benpai!"
                image="https://cdn.thefemdevs.com/assets/images/grav/329f481757ca49ce98d31d9041285a11"
                favicon="https://cdn.thefemdevs.com/assets/images/grav/329f481757ca49ce98d31d9041285a11"
            />
            <body>
                <div className="flex items-center justify-center min-h-screen">
                    <Player />
                </div>
            </body>
        </>
    );
}