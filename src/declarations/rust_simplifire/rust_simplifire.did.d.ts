import type { Principal } from '@dfinity/principal';
export type TimestampMillis = bigint;
export interface TodoItem {
  'id' : number,
  'added' : TimestampMillis,
  'done' : boolean,
  'name' : string,
}
export interface _SERVICE {
  'add' : (arg_0: string) => Promise<number>,
  'get' : (arg_0: [] | [boolean]) => Promise<Array<TodoItem>>,
  'get_simple' : (arg_0: [] | [boolean]) => Promise<Array<TodoItem>>,
  'mark_done' : (arg_0: number) => Promise<boolean>,
  'save_simple' : (arg_0: string) => Promise<undefined>,
}
