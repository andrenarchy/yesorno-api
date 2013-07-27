function (newDoc, oldDoc, userCtx, secObj) {
  function required(field, message /* optional */) {
    if (!newDoc[field]) {
      throw({forbidden: message || "Document must have a " + field});
    }
  }

  function unchanged(field) {
    if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field]))
      throw({forbidden: "Field can't be changed: " + field});
  }

  function isType(field, type, message) {
    if (typeof(newDoc[field]) != type) {
      throw({forbidden: message || "Field '" + field + "' must be a " + type});
    }
  }

  // tests if the field is a valid date
  // by checking invariance under ( new Date(...) ).toISOString()
  function isDate(field, message) {
    var date = (new Date(newDoc[field])).toISOString();
    if (newDoc[field] != date) {
      throw({forbidden: (message 
        || "Field "+field+" has to be invariant under (new Date(...)).toISOString() (evaluates to "+date+")") });
    }
    return date;
  }

  function user_is(role) {
    return userCtx.roles.indexOf(role) >= 0;
  }

  if (newDoc._deleted) {
    if (user_is('_admin')) {
      return;
    } else {
      throw({forbidden: 'Only admins are allowed to delete docs.'});
    }
  }

  required('ctime');
  isDate('ctime');

  required('mtime');
  isDate('mtime');

  required('user');
  isType('user', 'string');

  required('type');
  if (newDoc['type']=='yesorno') {
    // the validation should be the same as in the Backbone model 'Yesorno' in
    // the client
    required('question');
    isType('question', 'string');

    required('answer');
    isType('answer', 'boolean');

    required('answer_true');
    isType('answer_true', 'string');

    required('answer_false');
    isType('answer_false', 'string');

    // TODO: check user!
  } else {
    throw({forbidden: 'Unknown type: '+ newDoc['type'] });
  }

}
