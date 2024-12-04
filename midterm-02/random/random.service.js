export const randomService = (req, res) => {
  if (Math.random() < 0.5) {
    return res.status(403).json({ error: "Request Denied" });
  }

  res.status(200).send("Request passed!");
};
