export const idlFactory = ({ IDL }) => {
  const Document = IDL.Record({
    'created' : IDL.Text,
    'content' : IDL.Text,
    'name' : IDL.Text,
  });
  const User = IDL.Record({
    'id' : IDL.Text,
    'email' : IDL.Text,
    'first_name' : IDL.Text,
    'second_name' : IDL.Text,
  });
  const Profile = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'keywords' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addUser' : IDL.Func([IDL.Text], [IDL.Text], []),
    'add_doc' : IDL.Func([Document], [], []),
    'add_user' : IDL.Func([User], [], []),
    'adddoc' : IDL.Func([Document], [], []),
    'get' : IDL.Func([IDL.Text], [Profile], []),
    'getDocSelf' : IDL.Func([], [Document], ['query']),
    'getSelf' : IDL.Func([], [Profile], ['query']),
    'get_doc' : IDL.Func([IDL.Text], [Document], ['query']),
    'get_docs' : IDL.Func([], [IDL.Vec(Document)], ['query']),
    'get_simple' : IDL.Func([], [IDL.Text], []),
    'get_user' : IDL.Func([IDL.Text], [User], ['query']),
    'getcount' : IDL.Func([], [IDL.Nat], ['query']),
    'getdoc' : IDL.Func([IDL.Text], [Document], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'increment' : IDL.Func([], [], []),
    'save_simple' : IDL.Func([IDL.Text], [], []),
    'search' : IDL.Func([IDL.Text], [IDL.Opt(Profile)], ['query']),
    'set' : IDL.Func([IDL.Nat], [], []),
    'update' : IDL.Func([Profile], [], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
