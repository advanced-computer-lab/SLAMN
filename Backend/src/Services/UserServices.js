const User = require("../Models/UserModel");
const signIn = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.password;

  try {
    const data = await User.find({ Email: email });
    if (data) {
      if (data.password === password) {
        return res.json({
          statusCode: 0,
          message: "Success",
          data: data.Admin,
        });
      } else {
        return res.json({
          statusCode: 1,
          error: "Invalid Password",
        });
      }
    } else {
      return res.json({
        statusCode: 1,
        error: "Invalid Email",
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

module.exports = { signIn };
