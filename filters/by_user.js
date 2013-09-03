function(doc, req){
  // is the document part of a collection?
  if(req.query && doc.user==req.query.keys)
    return true;
  // has the document been deleted?
  else if (req.query && req.query.collection && doc._deleted)
    return true;
  else
    return false;
}
