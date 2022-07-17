
use ic_cdk_macros::*;

use crate::{RUNTIME_STATE, RuntimeState, Document, DocumentVersion};

#[update]
fn add_doc(current_editor_id: u32, name: String) -> u32 {
    RUNTIME_STATE.with(|state| add_doc_impl(current_editor_id, name, &mut state.borrow_mut()))
}
fn add_doc_impl(current_editor_id: u32, name: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.documents.push(Document {
        id,
        current_editor_id,
        name,
        active: true,
        added: now,
        updated: now,
        deleted: 0,
    });

    id
}

#[query]
fn get_docs(active_filter: Option<bool>) -> Vec<Document> {
    RUNTIME_STATE.with(|state| get_docs_impl(active_filter, &state.borrow()))
}
fn get_docs_impl(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<Document> {
    runtime_state.data.documents.iter().filter(|i| active_filter.map_or(true, |d| i.active == d)).cloned().collect()
}

#[query]
fn get_doc(doc_id: u32) -> Option<Document> {
    RUNTIME_STATE.with(|state| get_doc_impl(doc_id, &state.borrow()))
}
fn get_doc_impl(doc_id: u32, runtime_state: &RuntimeState) -> Option<Document> {
    runtime_state.data.documents.iter().filter(|i| i.id == doc_id).cloned().next()
}

#[update]
fn change_current_doc_editor(id: u32, current_editor_id: u32) -> bool {
    RUNTIME_STATE.with(|state| change_current_doc_editor_impl(id, current_editor_id, &mut state.borrow_mut()))
}
fn change_current_doc_editor_impl(id: u32, current_editor_id: u32, runtime_state: &mut RuntimeState) -> bool {
    if let Some(document) = runtime_state.data.documents.iter_mut().find(|i| i.id == id) {
        document.current_editor_id = current_editor_id;
        true
    } else {
        false
    }
}


#[update]
fn add_document_version(
        document_id: u32, version_number: u32, editor_user_id: u32, content: String)
         -> u32 {
    RUNTIME_STATE.with(|state| add_document_version_impl(
        document_id, version_number, editor_user_id, content, &mut state.borrow_mut()))
}
fn add_document_version_impl(document_id: u32, version_number: u32, editor_user_id: u32, content: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.documentversions.push(DocumentVersion {
        id,
        document_id,
        version_number,
        editor_user_id,
        content,
        active: true,
        added: now,
        updated: now,
        deleted: 0,
    });

    id
}

#[query]
fn get_document_versions(active_filter: Option<bool>) -> Vec<DocumentVersion> {
    RUNTIME_STATE.with(|state| get_document_versions_impl(active_filter, &state.borrow()))
}

fn get_document_versions_impl(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<DocumentVersion> {
    runtime_state.data.documentversions.iter().filter(|i| active_filter.map_or(true, |d| i.active == d)).cloned().collect()
}

#[update]
fn update_document_version(id: u32, content: String) -> bool {
    RUNTIME_STATE.with(|state| update_document_version_impl(id, content, &mut state.borrow_mut()))
}
fn update_document_version_impl(id: u32, content: String, runtime_state: &mut RuntimeState) -> bool {
    if let Some(document_version) = runtime_state.data.documentversions.iter_mut().find(|i| i.id == id) {
        document_version.content = content;
        true
    } else {
        false
    }
}