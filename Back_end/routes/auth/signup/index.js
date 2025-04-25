const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { insertNewDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { send_email } = require("../../../lib");

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  password: Joi.string().required(),
});


const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const validate = await schema.validateAsync(req.body);

    const check_user_exist = await findOne("user", { email });
    if (check_user_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "User already exist!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ status: 400, message: "Password must be at least 6 characters" });
    }
    if (password.length > 30) {
      return res
        .status(400)
        .send({ status: 400, message: "Password must be at most 30 characters" });
    }


    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return res
        .status(400)
        .send({ status: 400, message: "Email is not valid" });
    }
    
    const new_user = {
      ...req.body,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    };


    const user = await insertNewDocument("user", new_user);

    let token = jwt.sign({ id: new_user._id }, SECRET);

    user.password = undefined;


    // Send Email 

    // send_email(
    //   "registration-email",
    //   {
    //     username: user.first_name,
    //     location: "test",
    //   },
    //   "Health Titan Pro",
    //   "Awaiting Admin Approval",
    //   user.email
    // );


    return res.status(200).send({ status: 200, user, token });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = {signUpUser};
