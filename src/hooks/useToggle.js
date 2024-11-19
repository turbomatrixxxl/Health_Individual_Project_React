import { useState } from "react";

export default function useToggle(initialValue) {
    const [isOpen, setIsOpen] = useState(initialValue);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return [isOpen, toggle];
}
