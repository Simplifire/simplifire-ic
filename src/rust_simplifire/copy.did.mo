type TimestampMillis = nat64;

type Document =
    record {
        id: nat32;
        added: TimestampMillis;
        name: text;
        content: text;
        done: bool;
    };

type User =
    record {
        id: nat32;
        first_name: text;
        last_name: text:
        email: text;
        added: TimestampMillis; 
    };

type UserDocument =
    record {
        id: nat32;
        document_id: nat32;
        user_id: nat32;
        role: text;
    }

service: {

    // USER
    // Create new user with names and email
    add_user: (Principal, text, text, text) -> ();
    // Get user with principal id;
    get_user: (Principal) -> (User) query;
    // Update user metadata
    update_user: (Principal, text, text, text) -> ();
    
    // DOCUMENT
    // Add a document with name and content
    add_doc: (text, text) -> ();
    // Get document with key
    get_doc: (id) -> (Document) query;
    // Get all Documents
    get_docs: (opt bool) -> (vec Document) query;
    // Update Document
    update_doc (nat) -> ();

    // DOCUMENT_USER
    // Create Document/User connection
    // Provide document key, user id, role
    // Valid role values: "Author", "Counterparty"
    add_doc_user: (nat, nat, text ) -> ();
    // Get all Document/User connections
    get_doc_users: () -> (vec UserDocument) query;
    // Update Document/User
    update_doc_user: (nat) -> ();

}

