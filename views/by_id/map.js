function (doc) {
  if (doc.type=='yesorno') {
    emit(doc._id, doc);
  }
}
