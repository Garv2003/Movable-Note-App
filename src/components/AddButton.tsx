const colors = [
    {
        "id": "color-yellow",
        "colorHeader": "#FFEFBE",
        "colorBody": "#FFF5DF",
        "colorText": "#18181A"
    },
    {
        "id": "color-green",
        "colorHeader": "#AFDA9F",
        "colorBody": "#BCDEAF",
        "colorText": "#18181A"
    },
    {
        "id": "color-blue",
        "colorHeader": "#9BD1DE",
        "colorBody": "#A6DCE9",
        "colorText": "#18181A"
    },
    {
        "id": "color-purple",
        "colorHeader": "#FED0FD",
        "colorBody": "#FEE5FD",
        "colorText": "#18181A"
    }
]

import Plus from "../icons/Plus";
import { useRef } from "react";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
    const startingPos = useRef(10);
    const { setNotes } = useContext(NoteContext);

    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };

        startingPos.current += 10;

        console.log("Add note with payload: ", payload);
        setNotes((prevState) => [...prevState, { ...payload, $id: prevState.length + 1, body: JSON.stringify('') }]);
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;