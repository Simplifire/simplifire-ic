import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'get' : () => Promise<bigint>,
  'greet' : (arg_0: string) => Promise<string>,
  'increment' : () => Promise<undefined>,
  'set' : (arg_0: bigint) => Promise<undefined>,
}
