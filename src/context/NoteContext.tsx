import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Spinner } from "../icons";
import { getUser } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../appwrite/database";
import { Note, User, DocumentsResponse, NoteContextType } from "../helper/type";

const defaultContext: NoteContextType = {
    notes: [],
    setNotes: () => { },
    selectedNote: null,
    setSelectedNote: () => { },
    user: null,
    setUser: () => { },
};

export const NoteContext = createContext<NoteContextType>(defaultContext);

const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const currentUser = await getUser();
            if (!currentUser) {
                navigate("/login");
                return;
            }
            setUser(currentUser);
            const response: DocumentsResponse = await db.notes.list(currentUser.$id);
            setNotes(response.documents);
            setLoading(false);
        } catch (error) {
            console.error(error);
            navigate("/login");
        }
    };

    const contextData: NoteContextType = { notes, setNotes, selectedNote, setSelectedNote, user, setUser };

    return (
        <NoteContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NoteContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (context === undefined) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
}

export default NotesProvider;