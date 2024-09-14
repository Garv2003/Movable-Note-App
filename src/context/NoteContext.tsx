import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";

export const fakeData = [
    {
        $id: 1,
        body: JSON.stringify(
            'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
        ),
        colors: JSON.stringify({
            id: "color-purple",
            colorHeader: "#FED0FD",
            colorBody: "#FEE5FD",
            colorText: "#18181A",
        }),
        position: JSON.stringify({ x: 505, y: 10 }),
    },
    {
        $id: 2,
        body: JSON.stringify(
            'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
        ),
        colors: JSON.stringify({
            id: "color-blue",
            colorHeader: "#9BD1DE",
            colorBody: "#A6DCE9",
            colorText: "#18181A",
        }),
        position: JSON.stringify({ x: 305, y: 110 }),
    },
    {
        $id: 3,
        body: JSON.stringify(
            'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
        ),
        colors: JSON.stringify({
            id: "color-yellow",
            colorHeader: "#FFEFBE",
            colorBody: "#FFF5DF",
            colorText: "#18181A",
        }),
        position: JSON.stringify({ x: 605, y: 500 }),
    },
];


export const NoteContext = createContext();

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState(fakeData);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        setNotes(fakeData);
        setLoading(false);
    };

    const contextData = { notes, setNotes, selectedNote, setSelectedNote };

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
export default NotesProvider;