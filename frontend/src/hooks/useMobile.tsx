import { useState, useEffect } from "react";

function useMobile(): boolean {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const isMobile: boolean = width <= 430;
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange(): void {
        setWidth(window.innerWidth);
    };

    return isMobile;
};

export { useMobile };