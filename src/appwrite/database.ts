import { databases, collections } from "./config";
import { ID, Query } from "appwrite";

interface Collection {
    name: string;
    dbId: string;
    id: string;
}

interface DB {
    [key: string]: {
        create: (payload: any, id?: string) => Promise<any>;
        update: (id: string, payload: any) => Promise<any>;
        delete: (id: string) => Promise<any>;
        get: (id: string) => Promise<any>;
        list: (user_id: string) => Promise<any>;
    };
}

const db: DB = {};

collections.forEach((collection: Collection) => {
    db[collection.name] = {
        create: async (payload, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        update: async (id: string, payload: any) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        delete: async (id: string) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        get: async (id: string) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        list: async (user_id: string) => {
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                [
                    Query.equal("user_id", user_id)
                ]
            );
        },
    };
});

export { db };