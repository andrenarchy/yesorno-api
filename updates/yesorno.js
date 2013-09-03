function (doc, req) {
  var newdoc = JSON.parse(req.body);
  if (newdoc.type != 'yesorno') {
    return [null, 'Error: type != yesorno'];
  }

  // does the doc already exist?
  if (doc) {
    if (doc._id != newdoc._id) {
      return [null, 'Error: id mismatch'];
    }
  }

  var date = (new Date()).toISOString();
  newdoc.ctime = doc ? doc.ctime : date;
  newdoc.mtime = date;

  return [newdoc, 'doc updated'];
}
