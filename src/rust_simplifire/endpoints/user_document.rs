
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
        agreed: false,
        signed_as: String::new(),
        signed_on_behalf_of: String::new(),
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
fn accept_user_document(id: u32) -> bool {
    RUNTIME_STATE.with(|state| accept_user_document_impl(id, &mut state.borrow_mut()))
}

fn accept_user_document_impl(id: u32, runtime_state: &mut RuntimeState) -> bool {
    if let Some(user_doc) = runtime_state.data.userdocuments.iter_mut().find(|i| i.id == id) {
        user_doc.agreed = true;
        true
    } else {
        false
    }
}

#[update]
fn revert_user_document_acceptance(id: u32) -> bool {
    RUNTIME_STATE.with(|state| revert_user_document_acceptance_impl(id, &mut state.borrow_mut()))
}

fn revert_user_document_acceptance_impl(id: u32, runtime_state: &mut RuntimeState) -> bool {
    if let Some(user_doc) = runtime_state.data.userdocuments.iter_mut().find(|i| i.id == id) {
        user_doc.agreed = false;
        true
    } else {
        false
    }
}

#[update]
fn sign_user_document(id: u32, signed_as: String, signed_on_behalf_of: String) -> bool {
    RUNTIME_STATE.with(|state| sign_user_document_impl(id, signed_as, signed_on_behalf_of, &mut state.borrow_mut()))
}
fn sign_user_document_impl(id: u32, signed_as: String, signed_on_behalf_of: String, runtime_state: &mut RuntimeState) -> bool {
    if let Some(user_doc) = runtime_state.data.userdocuments.iter_mut().find(|i| i.id == id) {
        user_doc.signed_as = signed_as;
        user_doc.signed_on_behalf_of = signed_on_behalf_of;
        true
    } else {
        false
    }
}