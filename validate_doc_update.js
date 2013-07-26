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

  function isNumber(field, message) {
    if (typeof(newDoc[field]) != "number") {
      throw({forbidden: "Field must be a number: " + field});
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

}
