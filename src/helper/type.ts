interface User {
    $createdAt: string;
    $id: string;
    $updatedAt: string;
    accessedAt: string;
    email: string;
    emailVerification: boolean;
    labels: string[];
    mfa: boolean;
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: Record<string, unknown>;
    registration: string;
    status: boolean;
}

interface Note {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $updatedAt: string;
    body: string;
    colors: string;
    position: string;
    user_id: string;
}

interface DocumentsResponse {
    documents: Note[];
    total: number;
}

interface NoteContextType {
    notes: Note[];
    setNotes: (notes: Note[]) => void;
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

interface Color {
    id: "color-blue" | "color-green" | "color-yellow" | "color-purple";
    colorHeader: string;
    colorBody: string;
    colorText: string;
};

export type { User, Note, DocumentsResponse, NoteContextType, Color };