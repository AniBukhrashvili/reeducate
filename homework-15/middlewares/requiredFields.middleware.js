export const requiredFieldsMiddleware = (req, res, next) => {
  const requiredFields = ["category", "price", "currency"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields,
    });
  }

  next();
};