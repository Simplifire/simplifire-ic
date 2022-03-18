# rust_simplifire

Welcome to the rust_simplifire project. The goal of the project is to port the Simplfire contract management platform to the internet computer

To learn more before you start working with rust_simplifire, see the following documentation available online:

- [Quick Start](https://smartcontracts.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://smartcontracts.org/docs/developers-guide/sdk-guide.html)
- [Rust Canister Devlopment Guide](https://smartcontracts.org/docs/rust-guide/rust-intro.html)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://smartcontracts.org/docs/candid-guide/candid-intro.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

To start working on your project right away, clone the project from github and proceed as shown below.

## Install the SDK

The latest version of the DFinity Canister smart contract SDK package can be installed by running the following command in a terminal shell. This installation includes dfx, the DFinity execution command-line interface

```bash
# Installs the DFinity SDK
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```


## Running the project locally

If you want to test the project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background --clean

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

The front-end can be generated to see the application at http://localhost:8080/ in the browser:
```bash
npm install
npm start
```
