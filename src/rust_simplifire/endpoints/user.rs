
use ic_cdk_macros::*;

use crate::{RUNTIME_STATE, User, RuntimeState};

#[update]
fn add_user(principal_id: String, provider_id: String, first_name: String, last_name: String, email: String) -> u32 {
    RUNTIME_STATE.with(|state| add_user_impl(principal_id, provider_id, first_name, last_name, email, &mut state.borrow_mut()))
}
fn add_user_impl(principal_id: String, provider_id: String, first_name: String, last_name: String, email: String, runtime_state: &mut RuntimeState) -> u32 {
    let id = runtime_state.env.random_u32();
    let now = runtime_state.env.now();

    runtime_state.data.users.push(User {
        id,
        principal_id,
        provider_id,
        first_name,
        last_name,
        email,
        active: true,
        added: now,
        updated: now,
        deleted: 0,
    });

    id
}

#[query]
fn get_users(active_filter: Option<bool>) -> Vec<User> {
    RUNTIME_STATE.with(|state| get_users_impl(active_filter, &state.borrow()))
}

fn get_users_impl(active_filter: Option<bool>, runtime_state: &RuntimeState) -> Vec<User> {
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