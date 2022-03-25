use ic_cdk::{
 //   api::call::ManualReply,
    export::{
        candid::{CandidType, Deserialize},
        Principal,
    },
};

use ic_cdk_macros::*;
use ic_cdk::export::candid;
use std::cell::RefCell;
use std::collections::BTreeMap;

type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, Profile>;
type DocumentStore = BTreeMap<Principal, Document>;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
struct Profile {
    pub name: String,
    pub description: String,
    pub keywords: Vec<String>,
}

// static mut COUNTER: Option<candid::Nat> = None;

struct User {
    pub id: String,
    pub first_name: String,
    pub second_name: String,
}

#[derive(Clone, CandidType, Debug, Default, Deserialize )]
struct Document {
    pub id: String,
    pub name: String,
    pub content: String,
    pub created: String,
}

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static DOCUMENT_STORE: RefCell<DocumentStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
}

#[query(name = "getSelf")]
fn get_self() -> Profile {
    let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&id)
            .cloned()
            .unwrap_or_else(|| Profile::default())
    })
}

#[query]
fn get(name: String) -> Profile {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned())
                .unwrap_or_else(|| Profile::default())
        })
    })
}

#[update]
fn update(profile: Profile) {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.name.clone(), principal_id);
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal_id, profile);
    });
}

// Greet function
#[ic_cdk_macros::query]
    fn greet(name: String) -> String {
        format!("Name returned from IC canister: {}!", name)
}

#[ic_cdk_macros::query]
fn add_user(name: String) -> String {
    format!("Text returned from: {}!", name)
}

// Add Document
#[update]
fn addDoc(document: Document) {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(document.name.clone(), principal_id);
    });
    DOCUMENT_STORE.with(|document_store| {
        document_store.borrow_mut().insert(principal_id, document);
    });
}

#[ic_cdk_macros::query]
fn get_docs() -> String {
    format!("Text returned")
}

