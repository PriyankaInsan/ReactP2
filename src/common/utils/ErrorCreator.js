
export class MyError extends Error {
  constructor(data, status, type) {
    super(data.message);
    this.message = data;
    this.status = status;
    this.type = type;
  }
}