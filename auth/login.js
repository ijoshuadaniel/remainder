const { connection } = require('./../database.js');

const handleLogin = (req, res, data) => {
  if (data && (!data.email || !data.password)) return res.send(null);
  connection.query(
    'SELECT * FROM auth WHERE email = ?',
    [data.email],
    (error, result) => {
      if (error) {
        return res
          .status(401)
          .json({ status: 'failed', error: true, message: 'User not found' });
      }
      const userData = {
        ...result[0],
      };
      if (
        userData.email !== data.email ||
        userData.password !== data.password
      ) {
        return res.status(200).json({
          status: 'failed',
          error: true,
          message: 'Unauthorized Access',
        });
      }
      return res.status(200).json({
        status: 'success',
        error: false,
        message: '',
        user: { email: result[0].email, loggedIn: true },
      });
    }
  );
};

module.exports = {
  handleLogin,
};
