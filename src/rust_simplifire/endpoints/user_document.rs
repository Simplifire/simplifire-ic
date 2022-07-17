
use ic_cdk_macros::*;

use crate::{RUNTIME_STATE, RuntimeState, UserDocument};

#[update]
fn add_user_document(
        document_id: u32, user_id: u32, role: String)
         -> u32 {
    RUNTIME_STATE.with(|state| add_user_document_impl(
        document_id, user_id, role, &mut state.borrow_mut()))
}

fn add_user_document_impl(document_id: u32, user_id: u32, role: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.userdocuments.push(UserDocument {
        id,
        added: now,
        updated: now,
        deleted: 0,
        user_id,
        document_id,
        role,
        can_edit: true,
        signed: false,
        active: true,
    });

    id
}
#[query]
fn get_user_documents(active_filter: Option<bool>) -> Vec<UserDocument> {
    RUNTIME_STATE.with(|state| get_user_documents_impl(active_filter, &state.borrow()))
}

fn get_user_documents_impl(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<UserDocument> {
    runtime_state.data.userdocuments.iter().filter(|i| active_filter.map_or(true, |d| i.active == d)).cloned().collect()
}

#[update]
fn update_user_doc(id: u32, document_id: u32, user_id: u32, role: String, can_edit: bool, signed: bool) -> bool {
    RUNTIME_STATE.with(|state| update_user_doc_impl(id, document_id, user_id, role, can_edit, signed, &mut state.borrow_mut()))
}
fn update_user_doc_impl(id: u32, document_id: u32, user_id: u32, role: String, can_edit: bool, signed: bool, runtime_state: &mut RuntimeState) -> bool {
    if let Some(user_doc) = runtime_state.data.userdocuments.iter_mut().find(|i| i.id == id) {
        user_doc.document_id = document_id;
        user_doc.user_id = user_id;
        user_doc.role = role;
        user_doc.can_edit = can_edit;
        user_doc.signed = signed;
        true
    } else {
        false
    }
}