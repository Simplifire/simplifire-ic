mod env;

use crate::env::{CanisterEnv, EmptyEnv, Environment};
use candid::CandidType;
use ic_cdk_macros::*;
use serde::Deserialize;
use std::cell::RefCell;

type TimestampMillis = u64;

static mut COUNTER: Option<candid::Nat> = None;

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
}

#[derive(CandidType, Deserialize, Clone)]
struct Document {
    id: u32,
    added: TimestampMillis,
    name: String,
    content: String,
    active: bool,
}

#[derive(CandidType, Deserialize, Clone)]
struct User {
    id: u32,
    first_name: String,
    last_name: String,
    email: String,
    added: TimestampMillis,
    active: bool,
} 

#[derive(CandidType, Deserialize, Clone)]
struct UserDocument {
        id: u32,
        document_id: u32,
        user_id: u32,
        role: String,
        can_edit: bool,
        signed: bool,
        added: TimestampMillis,
        active: bool,
    }

#[init]
fn init() {
    let env = Box::new(CanisterEnv::new());
    let data = Data::default();
    let runtime_state = RuntimeState { env, data };

    RUNTIME_STATE.with(|state| *state.borrow_mut() = runtime_state);

    unsafe {COUNTER = Some(candid::Nat::from(0)); }
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

// DOCUMENT

#[update]
fn add_doc(name: String, content: String) -> u32 {
    RUNTIME_STATE.with(|state| add_impl2(name, content, &mut state.borrow_mut()))
}
fn add_impl2(name: String, content: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.documents.push(Document {
        id,
        added: now,
        name,
        content,
        active: true,
    });

    id
}

#[query]
fn get_docs(active_filter: Option<bool>) -> Vec<Document> {
    RUNTIME_STATE.with(|state| get_impl2(active_filter, &state.borrow()))
}
fn get_impl2(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<Document> {
    runtime_state.data.documents.iter().filter(|i| active_filter.map_or(true, |d| i.active == d)).cloned().collect()
}

#[update]
fn update_doc(id: u32, content: String) -> bool {
    RUNTIME_STATE.with(|state| update_doc_impl(id, content, &mut state.borrow_mut()))
}
fn update_doc_impl(id: u32, content: String, runtime_state: &mut RuntimeState) -> bool {
    if let Some(document) = runtime_state.data.documents.iter_mut().find(|i| i.id == id) {
        document.active = true;
        document.content = content;
        true
    } else {
        false
    }
}

// USER

#[update]
fn add_user(first_name: String, last_name: String, email: String) -> u32 {
    RUNTIME_STATE.with(|state| add_impl3(first_name, last_name, email, &mut state.borrow_mut()))
}
fn add_impl3(first_name: String, last_name: String, email: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.users.push(User {
        id,
        added: now,
        first_name,
        last_name,
        email,
        active: true,
    });

    id
}

#[query]
fn get_users(active_filter: Option<bool>) -> Vec<User> {
    RUNTIME_STATE.with(|state| get_impl4(active_filter, &state.borrow()))
}

fn get_impl4(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<User> {
    runtime_state.data.users.iter().filter(|i| active_filter.map_or(true, |d| i.active == d)).cloned().collect()
}

#[update]
fn update_user(id: u32, first_name: String, second_name: String, email: String) -> bool {
    RUNTIME_STATE.with(|state| update_user_impl(id, first_name, second_name, email, &mut state.borrow_mut()))
}
fn update_user_impl(id: u32, first_name: String, second_name: String, email: String, runtime_state: &mut RuntimeState) -> bool {
    if let Some(user) = runtime_state.data.users.iter_mut().find(|i| i.id == id) {
        user.first_name = first_name;
        user.last_name = second_name;
        user.email = email;
        true
    } else {
        false
    }
}

// USER DOCUMENT

#[update]
fn add_user_document(
        document_id: u32, user_id: u32, role: String)
         -> u32 {
    RUNTIME_STATE.with(|state| add_impl5(
        document_id, user_id, role, &mut state.borrow_mut()))
}

fn add_impl5(document_id: u32, user_id: u32, role: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.userdocuments.push(UserDocument {
        id,
        added: now,
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
    RUNTIME_STATE.with(|state| get_impl6(active_filter, &state.borrow()))
}

fn get_impl6(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<UserDocument> {
    runtime_state.data.userdocuments.iter().filter(|i| active_filter.map_or(true, |d| i.active == d)).cloned().collect()
}

#[update]
fn update_user_doc(id: u32, document_id: u32, user_id: u32, role: String, can_edit: bool) -> bool {
    RUNTIME_STATE.with(|state| update_user_doc_impl(id, document_id, user_id, role, can_edit, &mut state.borrow_mut()))
}
fn update_user_doc_impl(id: u32, document_id: u32, user_id: u32, role: String, can_edit: bool, runtime_state: &mut RuntimeState) -> bool {
    if let Some(user_doc) = runtime_state.data.userdocuments.iter_mut().find(|i| i.id == id) {
        user_doc.document_id = document_id;
        user_doc.user_id = user_id;
        user_doc.role = role;
        user_doc.can_edit = can_edit;
        true
    } else {
        false
    }
}