import Trash from "../icons/Trash";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/database";
import { Note } from "../helper/type";

const DeleteButton = ({ noteId }: { noteId: string }) => {
    const { setNotes } = useContext(NoteContext);

    const handleDelete = async () => {
        db.notes.delete(noteId);
        //@ts-ignore
        setNotes((prevState: Note[]) =>
            prevState.filter((note: Note) => note.$id !== noteId)
        );
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;