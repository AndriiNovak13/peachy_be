import joi from "joi";

export const userSchema = joi.object({
  firstName: joi.string().trim().min(2).max(30).required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
    "string.min": "First name should have a minimum length of 2",
    "string.max": "First name should have a maximum length of 30"
  }),
  lastName: joi.string().trim().min(2).max(30).required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
    "string.min": "Last name should have a minimum length of 2",
    "string.max": "Last name should have a maximum length of 30"
  }),
  email: joi.string().trim().lowercase().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address"
  }),
  profile: joi
    .object({
      bio: joi.string().trim().max(500).allow(null, "").messages({
        "any.required": "Bio is required",
        "string.max":
          "About Me section can have a maximum length of 500 characters"
      }),
      address: joi.string().trim().max(255).allow(null, "").messages({
        "any.required": "Address is required",
        "string.max": "Address can have a maximum length of 255 characters"
      }),
      education: joi.string().trim().max(255).allow(null, "").messages({
        "any.required": "Education is required",
        "string.max": "Education can have a maximum length of 255 characters"
      }),
      company: joi.string().trim().max(255).allow(null, "").messages({
        "any.required": "Company is required",
        "string.max": "Company can have a maximum length of 255 characters"
      })
    })
    .required()
});
