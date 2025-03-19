function paginate(array, page_size, page_number) {
  // human-readable page nOs
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports = paginate;
