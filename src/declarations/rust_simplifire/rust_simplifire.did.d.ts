import type { Principal } from '@dfinity/principal';
export type TimestampMillis = bigint;
export interface TodoItem {
  'id' : number,
  'content' : string,
  'added' : TimestampMillis,
  'done' : boolean,
  'name' : string,
}
export interface _SERVICE {
  'add' : (arg_0: string) => Promise<number>,
  'add_doc' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'get' : (arg_0: [] | [boolean]) => Promise<Array<TodoItem>>,
  'get_docs' : (arg_0: [] | [boolean]) => Promise<Array<TodoItem>>,
  'mark_done' : (arg_0: number) => Promise<boolean>,
}
