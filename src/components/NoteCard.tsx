import { Spinner } from "../icons";
import { useRef, useEffect, useState } from "react";
import { setNewOffset, setZIndex, bodyParser, autoGrow } from "../helper/utils";
import DeleteButton from "./DeleteButton";
import { useNotes } from "../context/NoteContext";
import { db } from "../appwrite/database";
import { Note } from "../helper/type";

const NoteCard = ({ note }: { note: Note }) => {
    const [position, setPosition] = useState(JSON.parse(note.position));
    const [saving, setSaving] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { setSelectedNote } = useNotes();
    const mouseStartPos = { x: 0, y: 0 };
    const colors = JSON.parse(note.colors);
    const body = bodyParser(note.body);

    useEffect(() => {
        if (textAreaRef.current) {
            autoGrow(textAreaRef);
        }
        if (cardRef.current) {
            setZIndex(cardRef);
        }
    }, []);

    const mouseMove = (e: MouseEvent) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        //@ts-ignore
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        //@ts-ignore
        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    const mouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).className === "card-header") {
            if (cardRef.current) {
                setZIndex(cardRef);
            }
            setSelectedNote(note);

            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
    };

    const saveData = async (key: string, value: any) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    const handleKeyUp = async () => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            if (textAreaRef.current) {
                saveData("body", textAreaRef.current.value);
            }
        }, 2000);
    };

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div
                className="card-header"
                onMouseDown={mouseDown}
                style={{
                    backgroundColor: colors.colorHeader,
                }}
            >
                <DeleteButton noteId={note.$id} />

                {saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>Saving...</span>
                    </div>
                )}
            </div>

            <div className="card-body">
                <textarea
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        if (cardRef.current) {
                            setZIndex(cardRef);
                        }
                        setSelectedNote(note);
                    }}
                    onInput={() => {
                        if (textAreaRef.current) {
                            autoGrow(textAreaRef);
                        }
                    }}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;