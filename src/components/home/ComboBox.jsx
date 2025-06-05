import { useEffect, useRef, useState } from "react"


export default function ComboBox({ suggestions, setSuggestions, label, suggestionValue, onEnter, onFocusClasses = "bg-primary text-white", ...inputProps }) {
    const [current, setCurrent] = useState(-1)
    const comboBoxRef = useRef(null)

    useEffect(() => {
        if (!suggestions || suggestions.length === 0) {
            setCurrent(-1)
        }

        const handleClickOutside = (event) => {
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
                setSuggestions([])
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }

    }, [suggestions])

    const handleKeyDown = (e) => {
        if (e.keyCode === 40) {  // down arrow
            e.preventDefault()
            if (suggestions?.length - 1 > current) {
                setCurrent((pre) => pre + 1)
            }
        }
        if (e.keyCode === 38) { //up arrows
            e.preventDefault()
            if (current !== -1) {
                setCurrent((pre) => pre - 1)
            }
        }
        if (e.keyCode == 13) { //enter 
            e.preventDefault()
            if (current > -1 && current < suggestions?.length) {
                onEnter(suggestions[current])
            }
        }
    }
    return (
        <div ref={comboBoxRef} className="relative">
            <input onKeyDown={handleKeyDown} {...inputProps} />
            <ul className="suggestions rounded-md absolute z-3 w-100 p-0 left-0 list-none">
                {suggestions?.length > 0 && suggestions.map((suggestion, i) => (
                    <li
                        key={suggestionValue ? suggestion[suggestionValue] : suggestion}
                        role='button'
                        onClick={() => onEnter(suggestion)}
                        className={` rounded-md px-1 py-2 text-black ${current === i ? onFocusClasses : "bg-white"} `}
                    >
                        {label ? suggestion[label] : suggestion}
                    </li>
                ))}
            </ul>
        </div>
    )
}