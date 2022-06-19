mod env;
mod user;
mod document;
mod user_document;

use crate::env::{CanisterEnv, EmptyEnv, Environment};
use candid::CandidType;
use ic_cdk_macros::*;
use serde::Deserialize;
use std::cell::RefCell;

type TimestampMillis = u64;

// WASM is single-threaded by nature. [RefCell] and [thread_local!] is used unsafe.
// This is to ensure that the canister state can be used throughout.
thread_local! {
    // If RuntimeState doesn't implement Default you can wrap it in an Option instead
    static RUNTIME_STATE: RefCell<RuntimeState> = RefCell::default();
}

struct RuntimeState {
    pub env: Box<dyn Environment>,
    pub data: Data,
}

impl Default for RuntimeState {
    fn default() -> Self {
        RuntimeState {
            env: Box::new(EmptyEnv {}),
            data: Data::default(),
        }
    }
}

#[derive(CandidType, Deserialize, Default)]
struct Data {
    documents: Vec<Document>,
    users: Vec<User>,
    userdocuments: Vec<UserDocument>,
    documentversions: Vec<DocumentVersion>,
}

#[derive(CandidType, Deserialize, Clone)]
struct Document {
    id: u32,
    current_editor_id: u32,
    name: String,
    active: bool,
    added: TimestampMillis,
    updated: TimestampMillis,
    deleted: TimestampMillis,
}

#[derive(CandidType, Deserialize, Clone)]
struct User {
    id: u32,
    principal_id: u32,
    first_name: String,
    last_name: String,
    email: String,
    active: bool,
    added: TimestampMillis,
    updated: TimestampMillis,
    deleted: TimestampMillis,
} 

#[derive(CandidType, Deserialize, Clone)]
struct UserDocument {
        id: u32,
        document_id: u32,
        user_id: u32,
        role: String,
        can_edit: bool,
        signed: bool,
        active: bool,
        added: TimestampMillis,
        updated: TimestampMillis,
        deleted: TimestampMillis,
    }

#[derive(CandidType, Deserialize, Clone)]
struct DocumentVersion {
        id: u32,
        document_id: u32,
        version_number: u32, 
        editor_user_id: u32,
        content: String,
        active: bool,
        added: TimestampMillis, 
        updated: TimestampMillis,
        deleted: TimestampMillis,
}

#[init]
fn init() {
    let env = Box::new(CanisterEnv::new());
    let data = Data::default();
    let runtime_state = RuntimeState { env, data };

    RUNTIME_STATE.with(|state| *state.borrow_mut() = runtime_state);
}

#[pre_upgrade]
fn pre_upgrade() {
    RUNTIME_STATE.with(|state| ic_cdk::storage::stable_save((&state.borrow().data,)).unwrap());
}

#[post_upgrade]
fn post_upgrade() {
    let env = Box::new(CanisterEnv::new());
    let (data,): (Data,) = ic_cdk::storage::stable_restore().unwrap();
    let runtime_state = RuntimeState { env, data };

    RUNTIME_STATE.with(|state| *state.borrow_mut() = runtime_state);
}