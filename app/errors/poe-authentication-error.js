export default class PoeAuthenticationError extends Error {
  constructor(message) {
    super();
    this.name = 'PoeAuthenticationError';
    this.message = message || 'Invalid POESESSID';
  }
}
