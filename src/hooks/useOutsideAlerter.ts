import { useEffect, MutableRefObject, useRef } from "react";

const useOutsideAlerter = (onClick: () => void) => {

    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClick();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return ref;
}

export default useOutsideAlerter;
