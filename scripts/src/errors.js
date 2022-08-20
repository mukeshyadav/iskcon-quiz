export class ProcessError extends Error {
  constructor(message, code = 1) {
    super(message);
  }
}
