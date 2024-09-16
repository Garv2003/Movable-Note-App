import AddButton from "./AddButton";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/database";
import { toast } from "react-hot-toast";
import { colors } from "../helper/constant";
import type { Color } from "../helper/type";

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

const Color = ({ color }: { color: Color }) => {
    const { selectedNote, setNotes, notes } = useContext(NoteContext)

    const changeColor = () => {
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote!.$id
            );

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            db.notes.update(selectedNote!.$id, {
                colors: JSON.stringify(color),
            });
        } catch {
            toast.error("Please select a note to change its color");
        }
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