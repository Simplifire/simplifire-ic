import { rust_simplifire } from "../../../declarations/rust_simplifire";

export default {
    async getDocumentById(doc_id) {
        const matchingDoc = await rust_simplifire.get_doc(Number(doc_id));
        if (matchingDoc && matchingDoc.length > 0) {
            return matchingDoc[0]
        }
        return null;
    },

    async getAllDocs() {
        return await rust_simplifire.get_docs([]);
    },

    async getAllDocumentVersions(documentId) {
        // TODO backend filtering
        return (await rust_simplifire.get_document_versions([]) || []).filter(v => v.document_id == documentId);
    },

    async addDocument(userId, documentName, content) {
        const documentId = await rust_simplifire.add_doc(userId, documentName);
        await rust_simplifire.add_user_document(documentId, userId, 'author');
        await rust_simplifire.add_document_version(documentId, 1, userId, content);

        return documentId;
    },
    
    async getDocumentUsers(documentId) {
        const all_user_docs = await rust_simplifire.get_user_documents([]);
        return all_user_docs.filter((a) => a.document_id == documentId);
    },

    async shareDocumentWithUser(documentId, documentName, sharedUserId) {
        await rust_simplifire.add_user_document(documentId, sharedUserId, "counter_party");
        await rust_simplifire.update_doc(documentId, sharedUserId, documentName);
        const new_version_id = await this.saveDocumentChanges(sharedUserId);
    },

    async saveDocumentChanges(documentId, target_user_id, documentContent) {
        const all_document_versions = await this.getAllDocumentVersions(documentId);

        return await rust_simplifire.add_document_version(
            documentId,
            all_document_versions.length + 1,
            target_user_id,
            documentContent
        );
    },
}