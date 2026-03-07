'use client';

import { useState, useEffect } from 'react';

export default function Loader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div id="loader">
            <div className="loader-logo">
                REGI<span>.</span>
            </div>
            <div className="loader-bar">
                <div className="loader-fill"></div>
            </div>
            <div className="loader-text">Initializing Portfolio</div>
        </div>
    );
}
