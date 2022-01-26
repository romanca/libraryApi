export function getLibrary(res, library) {
  return res.status(200).send(library);
}

export function getLibraryTags(res, tagsArray) {
  if (!tagsArray) {
    return res.status(404).send("The are no tags...!!!");
  } else {
    return res.status(200).send(tagsArray);
  }
}

export function getBookById(parsedId, book, res) {
  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!book) {
    return res.status(404).send("Book not found");
  } else {
    return res.status(200).send(book);
  }
}

export function postBook(result, newBook, res) {
  if (result.error) {
    return res.status(405).send("New book was not validated");
  } else {
    return res.status(200).send(newBook);
  }
}

export function editBook(parsedId, book, result, res) {
  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (result.error) {
    return res.status(405).send("New book was not validated");
  } else {
    return res.status(200).send(book);
  }
}
