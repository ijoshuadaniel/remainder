const { connection } = require('./../database');

const getTodo = (req, res) => {
  const data = req.body.body;
  if (!data) {
    return res.status(401).json({
      status: 'failed',
      error: true,
      message: 'Unauthorized Access',
    });
  }

  connection.query(
    'SELECT * FROM `todo` WHERE `email` = ? AND `completed` = ?',
    [data.email, 'false'],
    (error, result) => {
      if (error) {
        return res.status(401).json({
          status: 'Failed 2',
          error: true,
          message: 'Oops! Something went wrong',
        });
      }
      return res.status(200).json({
        status: 'success',
        error: false,
        message: 'Todo added Sucessfully',
        todo: result,
      });
    }
  );
};

module.exports = {
  getTodo,
};
