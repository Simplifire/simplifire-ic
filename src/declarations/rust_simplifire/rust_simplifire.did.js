export const idlFactory = ({ IDL }) => {
  const Document = IDL.Record({
    'id' : IDL.Text,
    'created' : IDL.Text,
    'content' : IDL.Text,
    'name' : IDL.Text,
  });
  const Profile = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'keywords' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addDoc' : IDL.Func([Document], [], []),
    'add_user' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get' : IDL.Func([IDL.Text], [Profile], []),
    'getSelf' : IDL.Func([], [Profile], ['query']),
    'get_doc' : IDL.Func([IDL.Text], [Document], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'search' : IDL.Func([IDL.Text], [IDL.Opt(Profile)], ['query']),
    'update' : IDL.Func([Profile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
