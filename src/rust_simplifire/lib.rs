use ic_cdk_macros::*;
use ic_cdk::export::candid;

static mut COUNTER: Option<candid::Nat> = None;

// Greet function
#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    format!("Name returned from IC canister: {}!", name)
}


#[init]
fn init() {
    unsafe {
        COUNTER = Some(candid::Nat::from(0));
    }
}

#[update]
fn increment() -> () {
    unsafe {
        COUNTER.as_mut().unwrap().0 += 1u64;
    }
}

#[query]
fn get() -> candid::Nat {
    unsafe { COUNTER.as_mut().unwrap().clone() }
}

#[update]
fn set(input: candid::Nat) -> () {
    unsafe {
        COUNTER.as_mut().unwrap().0 = input.0;
    }
}
