import Spinner from "../icons/Spinner";
import { useRef, useEffect, useState } from "react";
import { setNewOffset, setZIndex } from "../helper/utils";
import DeleteButton from "./DeleteButton";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
    const [position, setPosition] = useState(JSON.parse(note.position));
    const [saving, setSaving] = useState(false);
    const cardRef = useRef(null);
    const keyUpTimer = useRef(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { setSelectedNote } = useContext(NoteContext);
    const mouseStartPos = { x: 0, y: 0 };
    const colors = JSON.parse(note.colors);
    const body = JSON.parse(note.body);

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, []);

    function autoGrow(textAreaRef) {
        const { current } = textAreaRef;
        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    }

    const mouseMove = (e: MouseEvent) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };


        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        //3 - Update card top and left position.
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    const mouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).className === "card-header") {

            setZIndex(cardRef.current);

            setSelectedNote(note)

            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
    };


    const saveData = async (key, value) => {
        console.log(key, value);
        setSaving(false);
    };

    const handleKeyUp = async () => {
        //1 - Initiate "saving" state
        setSaving(true);

        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
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

                {
                    saving && (
                        <div className="card-saving">
                            <Spinner color={colors.colorText} />
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>

            <div className="card-body">
                <textarea
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                        setSelectedNote(note);
                    }}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;