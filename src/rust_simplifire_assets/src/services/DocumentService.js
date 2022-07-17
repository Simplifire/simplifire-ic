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

    async getThisUserDoc(documentId, userId) {
        return (await rust_simplifire.get_user_documents([]) || []).filter(v => v.document_id == documentId && v.user_id == userId);
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

    async shareDocumentWithUser(documentId, sharedUserId) {
        await rust_simplifire.add_user_document(documentId, sharedUserId, "counter_party");
        await rust_simplifire.change_current_doc_editor(documentId, sharedUserId);
    },

    async acceptDocument(documentId, userId) {
        const userDocA = await this.getThisUserDoc(documentId, userId);
        if (userDocA && userDocA.length === 1) {
            const userDoc = userDocA[0];
            await rust_simplifire.accept_user_document(userDoc.id);
        }
    },

    async revertAcceptance(documentId, userId) {
        const userDocA = await this.getThisUserDoc(documentId, userId);
        if (userDocA && userDocA.length === 1) {
            const userDoc = userDocA[0];
            await rust_simplifire.revert_user_document_acceptance(userDoc.id);
        }
    },

    async signDocument(documentId, userId, signedAs, signedOnBehalfOf) {
        const userDocA = await this.getThisUserDoc(documentId, userId);
        if (userDocA && userDocA.length === 1) {
            const userDoc = userDocA[0];
            await rust_simplifire.sign_user_document(userDoc.id, signedAs, signedOnBehalfOf);
        }
    },

    async saveDocumentChanges(documentId, target_user_id, documentContent) {
        const all_document_versions = await this.getAllDocumentVersions(documentId);

        await rust_simplifire.add_document_version(
            documentId,
            all_document_versions.length + 1,
            target_user_id,
            documentContent
        );
        await rust_simplifire.change_current_doc_editor(documentId, target_user_id);
        
    },
}