import { NoteCard, Controls } from "../components";
import { useNotes } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../appwrite/auth";
import { toast } from "react-hot-toast";

const NotesPage = () => {
    const { notes, user } = useNotes();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
        toast.success("Logged out successfully");
    }

    return (
        <div>
            <h1 className="left-header">Noteit</h1>
            <h2 className="right-header">Welcome {user?.name}</h2>
            {notes.map((note) => (
                <NoteCard key={note.$id} note={note} />
            ))}
            <Controls />
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default NotesPage
