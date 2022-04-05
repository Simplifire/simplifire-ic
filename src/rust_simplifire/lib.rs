use ic_cdk::{
    // api::call::ManualReply,
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

static mut COUNTER: Option<candid::Nat> = None;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
struct Profile {
    pub name: String,
    pub description: String,
    pub keywords: Vec<String>,
}

struct User {
    pub id: String,
    pub first_name: String,
    pub second_name: String,
}
#[derive(Clone, CandidType, Debug, Default, Deserialize )]
struct Document {
    // pub id: String,
    pub name: String,
    pub content: String,
    pub created: String,
}

// struct RuntimeState {
//     pub env: Box<dyn Environment>,
//     pub data: Data,
// }

// impl Default for RuntimeState {
//     fn default() -> Self {
//         RuntimeState {
//             env: Box::new(EmptyEnv {}),
//             data: DocData::default(),
//         }
//     }
// }

// #[derive(CandidType, Deserialize, Default)]
// struct DocData {
//     items: Vec<DocItem>
// }

// #[derive(CandidType, Deserialize, Clone)]
// struct DocItem {
//     name: String,
//     content: String,
//     created: String
// }

// #[init]
// fn init() {
//     let docdata = DocData::default();
// }
// #[update]
// fn add_item(name: String) -> u32 {
//     RUNTIME_STATE.with(|state| add_impl(name, &mut state.borrow_mut()))
// }

// fn add_impl(name: String, runtime_state: &mut RuntimeState) -> u32 {
//     let id = runtime_state.env.random_u32();
//     let now = runtime_state.env.now();

//     runtime_state.data.items.push(TodoItem {
//         id,
//         added: now,
//         name,
//         done: false,
//     });

//     id
// }

// #[query]
// fn get_docs() -> Vec<TodoItem> {
//     RUNTIME_STATE.with(|state| get_impl(done_filter, &state.borrow()))
// }

// fn get_impl(done_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<TodoItem> {
//     runtime_state.data.items.iter().filter(|i| done_filter.map_or(true, |d| i.done == d)).cloned().collect()
// }

// The way IC canisters are structured forces developers to use a global
// mutable state. Rust, on the other hand, intentionally makes it hard 
// to use global mutable variables, giving you a few options to choose 
// from. The thread_local pattern is is viewed as the safest option.
// See artice here: https://mmapped.blog/posts/01-effective-rust-canisters.html
// It is necessary to wrap in a default value.
// Subsequent functions can then borrow from the global state using
// the closure referenced here.
thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static DOCUMENT_STORE: RefCell<DocumentStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
 //   static RUNTIME_STATE: RefCell<RuntimeState> = RefCell::default();
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

#[query(name = "getDocSelf")]
fn get_doc_self() -> Document {
    let id = ic_cdk::api::caller();
    DOCUMENT_STORE.with(|document_store| {
        document_store
            .borrow()
            .get(&id)
            .cloned()
            .unwrap_or_else(|| Document::default())
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
    // ::caller returns the caller of the present call
    let principal_id = ic_cdk::api::caller();
    // inserts the caller id into the ID_STORE BTree collection
    // The 'with' function enables access to the global state
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.name.clone(), principal_id);
    });
    // inserts the Profile data provided in the CLI call into the
    // PROFILE_STORE BTree collection 
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal_id, profile);
    });
}

// Greet function
#[ic_cdk_macros::query]
    fn greet(name: String) -> String {
        format!("Name returned from IC canister: {}!", name)
}

// Simple persistnce
#[ic_cdk_macros::query]
    fn save_simple(text: String) -> String {
        format!("Text to be saved: {}!", text)
}
#[ic_cdk_macros::query]
    fn get_simple() -> String {
        format!("Saved text to be diaplayed")
}

#[ic_cdk_macros::query]
fn addUser(name: String) -> String {
    format!("Text returned from: {}!", name)
}

// Add Document
#[update]
fn adddoc(document: Document) {
    // ::caller returns the caller of the present call
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

// Get Document referenced by 'name'
#[query]
fn getdoc(name: String) -> Document {
    ID_STORE.with(|id_store| {
        DOCUMENT_STORE.with(|document_store| {
            id_store
                .borrow()
                .get(&name)
                .and_then(|id| document_store.borrow().get(id).cloned())
                .unwrap_or_else(|| Document::default())
        })
    })
}

#[ic_cdk_macros::query]
fn getdocs() -> String {
    format!("Text returned")
}

#[ic_cdk_macros::query]
fn getalldocs() -> String {
    format!("Text returned") 
}

// #[init]
// fn init() {
//     unsafe {
//         COUNTER = Some(candid::Nat::from(0));
//     }
// }

#[update]
fn increment() -> () {
    unsafe {
        COUNTER.as_mut().unwrap().0 += 1u64;
    }
}

#[query]
fn getcount() -> candid::Nat {
    unsafe { COUNTER.as_mut().unwrap().clone() }
}

#[update]
fn set(input: candid::Nat) -> () {
    unsafe {
        COUNTER.as_mut().unwrap().0 = input.0;
    }
}

// Add Document
#[update]
fn add_doc(document: Document) {
    // ::caller returns the caller of the present call
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

// #[update(name = "whoami")]
// fn whoami() -> String {
//     caller_api().to_string()
// }
