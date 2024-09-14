import Trash from "../icons/Trash";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const DeleteButton = ({ noteId }) => {
    const { setNotes } = useContext(NoteContext);

    const handleDelete = async (e) => {
        console.log("Delete note with id: ", noteId);
        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;