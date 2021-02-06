function sort<T>(a: T, b: T, sortOrder: string, getValue: (data: T) => any) {
  sortOrder = sortOrder || 'ASC';
  if (sortOrder === 'ASC') {
    return getValue(a) > getValue(b) ? 1 : -1;
  } else {
    return getValue(b) > getValue(a) ? 1 : -1;
  }
}

export { sort };
