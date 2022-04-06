export const idlFactory = ({ IDL }) => {
  const TimestampMillis = IDL.Nat64;
  const TodoItem = IDL.Record({
    'id' : IDL.Nat32,
    'added' : TimestampMillis,
    'done' : IDL.Bool,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'add' : IDL.Func([IDL.Text], [IDL.Nat32], []),
    'get' : IDL.Func([IDL.Opt(IDL.Bool)], [IDL.Vec(TodoItem)], ['query']),
    'get_simple' : IDL.Func(
        [IDL.Opt(IDL.Bool)],
        [IDL.Vec(TodoItem)],
        ['query'],
      ),
    'mark_done' : IDL.Func([IDL.Nat32], [IDL.Bool], []),
    'save_simple' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
