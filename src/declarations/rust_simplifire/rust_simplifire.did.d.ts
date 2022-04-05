import type { Principal } from '@dfinity/principal';
export interface Document {
  'created' : string,
  'content' : string,
  'name' : string,
}
export interface Profile {
  'name' : string,
  'description' : string,
  'keywords' : Array<string>,
}
export interface User {
  'id' : string,
  'email' : string,
  'first_name' : string,
  'second_name' : string,
}
export interface _SERVICE {
  'addUser' : (arg_0: string) => Promise<string>,
  'add_doc' : (arg_0: Document) => Promise<undefined>,
  'add_user' : (arg_0: User) => Promise<undefined>,
  'adddoc' : (arg_0: Document) => Promise<undefined>,
  'get' : (arg_0: string) => Promise<Profile>,
  'getDocSelf' : () => Promise<Document>,
  'getSelf' : () => Promise<Profile>,
  'get_doc' : (arg_0: string) => Promise<Document>,
  'get_docs' : () => Promise<Array<Document>>,
  'get_simple' : () => Promise<string>,
  'get_user' : (arg_0: string) => Promise<User>,
  'getcount' : () => Promise<bigint>,
  'getdoc' : (arg_0: string) => Promise<Document>,
  'greet' : (arg_0: string) => Promise<string>,
  'increment' : () => Promise<undefined>,
  'save_simple' : (arg_0: string) => Promise<undefined>,
  'search' : (arg_0: string) => Promise<[] | [Profile]>,
  'set' : (arg_0: bigint) => Promise<undefined>,
  'update' : (arg_0: Profile) => Promise<undefined>,
  'whoami' : () => Promise<string>,
}
