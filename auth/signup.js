const { connection } = require('./../database.js');

const handleSignUp = (req, res, data) => {
  connection.query(
    'SELECT * FROM `auth` WHERE `email`= ?',
    `${data.email}`,
    (error, result) => {
      if (error) {
        res.status(401).json({
          status: 'Failed',
          error: true,
          message: 'Oops! Something went wrong',
        });
        return;
      }
      if (result.length > 0) {
        res.status(200).json({
          status: 'Failed',
          error: true,
          message: 'User already exist',
        });
        return;
      }
      connection.query(
        'INSERT INTO auth(email,password) VALUES (?,?)',
        [data.email, data.password],
        (error) => {
          if (error) {
            res.status(401).json({
              status: 'Failed',
              error: true,
              message: 'Oops! Something went wrong',
              eD: error,
            });
            return;
          }
          res.status(200).json({
            status: 'Success',
            error: false,
            message: 'User added Sucessfully',
          });
          return;
        }
      );
    }
  );
};

module.exports = {
  handleSignUp,
};
