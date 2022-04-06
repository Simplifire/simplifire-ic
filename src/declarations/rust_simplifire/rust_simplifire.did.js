export const idlFactory = ({ IDL }) => {
  const TimestampMillis = IDL.Nat64;
  const TodoItem = IDL.Record({
    'id' : IDL.Nat32,
    'content' : IDL.Text,
    'added' : TimestampMillis,
    'done' : IDL.Bool,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'add' : IDL.Func([IDL.Text], [IDL.Nat32], []),
    'add_doc' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'get' : IDL.Func([IDL.Opt(IDL.Bool)], [IDL.Vec(TodoItem)], ['query']),
    'get_docs' : IDL.Func([IDL.Opt(IDL.Bool)], [IDL.Vec(TodoItem)], ['query']),
    'mark_done' : IDL.Func([IDL.Nat32], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
