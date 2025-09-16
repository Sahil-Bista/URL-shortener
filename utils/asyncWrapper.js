//takes a function, executes it and attaches catch(next) to send it to the error handler
export const asyncWrapper = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
