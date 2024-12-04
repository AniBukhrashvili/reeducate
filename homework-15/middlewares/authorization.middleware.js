export const authorizationMiddleware = (req, res, next) => {
  const key = req.headers["api-key"];
  if (!key) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
