const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { getPopulatedData } = require("../../../helpers/index");
const { findOneAndPopulate } = require("../../../helpers/index");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validate = await schema.validateAsync(req.body);

    const populatedUser = await findOneAndPopulate(
      "user",
      { email },
      "type",
      "type status"
    );

    const user = await findOneAndPopulate("user", { email }, "type", "type status")
    
    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ status: 400, message: "Invalid Email or Password!" });
      }
      user.password = undefined;
      var token = jwt.sign({ id: user._id }, SECRET);
      res.status(200).send({ status: 200, user, token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;
