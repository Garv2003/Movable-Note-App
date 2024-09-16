export const setNewOffset = (card: HTMLElement, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
    };
};

export function autoGrow(textAreaRef: React.RefObject<HTMLTextAreaElement>) {
    const { current } = textAreaRef;
    if (current) {
        current.style.height = "auto";
        current.style.height = `${current.scrollHeight}px`;
    }
}

export const setZIndex = (selectedCardRef: React.RefObject<HTMLElement>) => {
    const selectedCard = selectedCardRef.current;
    if (selectedCard) {
        selectedCard.style.zIndex = '999';

        Array.from(document.getElementsByClassName("card")).forEach((card) => {
            if (card !== selectedCard) {
                (card as HTMLElement).style.zIndex = `${parseInt(selectedCard.style.zIndex) - 1}`;
            }
        });
    }
};

export const bodyParser = (value: string) => {
    try {
        JSON.parse(value);
        return JSON.parse(value);
    } catch {
        return value;
    }
}