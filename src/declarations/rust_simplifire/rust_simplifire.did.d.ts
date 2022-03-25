import type { Principal } from '@dfinity/principal';
export interface Document {
  'id' : string,
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
  'addDoc' : (arg_0: Document) => Promise<undefined>,
  'add_user' : (arg_0: string) => Promise<string>,
  'get' : (arg_0: string) => Promise<Profile>,
  'getSelf' : () => Promise<Profile>,
  'get_doc' : (arg_0: string) => Promise<Document>,
  'greet' : (arg_0: string) => Promise<string>,
  'search' : (arg_0: string) => Promise<[] | [Profile]>,
  'update' : (arg_0: Profile) => Promise<undefined>,
}
