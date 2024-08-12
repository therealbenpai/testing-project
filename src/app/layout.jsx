import React from 'react';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {children}
        </html>
    );
}