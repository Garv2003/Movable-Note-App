import AddButton from "./AddButton";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

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

const Controls = () => {
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};

const Color = ({ color }) => {
    const { selectedNote, setNotes, notes } = useContext(NoteContext)

    const changeColor = () => {
        console.log("Selected color:", selectedNote);


        const currentNoteIndex = notes.findIndex(
            (note) => note.$id === selectedNote.$id
        );

        const updatedNote = {
            ...notes[currentNoteIndex],
            colors: JSON.stringify(color),
        };

        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        setNotes(newNotes);


    };

    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};
export default Controls;