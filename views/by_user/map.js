function (doc) {
  if (doc.type=='yesorno') {
    emit(doc.user, doc);
  }
}
