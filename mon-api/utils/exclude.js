function exclude(user, ...keys) {
  const result = { ...user };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

module.exports = { exclude };
