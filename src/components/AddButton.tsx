import Plus from "../icons/Plus";
import { useRef } from "react";
import { useNotes } from "../context/NoteContext";
import { db } from "../appwrite/database";
import { Note } from "../helper/type";
import { colors } from "../helper/constant";

const AddButton = () => {
    const startingPos = useRef(10);
    const { setNotes, user } = useNotes();

    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
            user_id: user!.$id,
        };

        startingPos.current += 10;
        const response = await db.notes.create(payload);
        //@ts-ignore
        setNotes((prevState: Note[]) => [response, ...prevState]);
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;