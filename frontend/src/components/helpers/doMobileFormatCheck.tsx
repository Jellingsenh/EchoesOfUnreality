import { useEffect } from "react";

export default function doMobileFormatCheck(
    // isMobile: boolean,
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        // Define the media query string
        const mediaQuery = window.matchMedia('(max-width: 360px)');

        // Handler function to update state
        const handleMediaQueryChange = (event: any) => {
            // console.log('Media query change detected. Is mobile:', event.matches);
            setIsMobile(event.matches);
        };

        // Set initial value immediately on mount
        setIsMobile(mediaQuery.matches);

        // Listen for changes across the breakpoint
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Clean up event listener on component unmount
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    // useEffect(() => {
    //   console.log('isMobile (might adjust range):', isMobile)
    // }, [isMobile])
}