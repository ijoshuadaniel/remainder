const { connection } = require('./../database');

const addTodo = (req, res) => {
  const data = req.body.body;
  if (!data) {
    return res.status(401).json({
      status: 'failed',
      error: true,
      message: 'Unauthorized Access',
    });
  }
  if (!data.isRemainder) {
    connection.query(
      'INSERT INTO todo(email,title,description,remainder,completed) VALUES(?,?,?,?,?)',
      [data.email, data.title, data.description, data.isRemainder, 'false'],
      (error, result) => {
        if (error) {
          return res.status(401).json({
            status: 'Failed 1',
            error: true,
            message: 'Oops! Something went wrong',
            ed: error,
          });
        }
        return res.status(200).json({
          status: 'success',
          error: false,
          message: 'Todo added Sucessfully',
        });
      }
    );
  } else {
    connection.query(
      'INSERT INTO todo(email,title,description,remainder,date,time,completed) VALUES(?,?,?,?,?,?,?)',
      [
        data.email,
        data.title,
        data.description,
        data.isRemainder,
        data.date,
        data.time,
        'false',
      ],
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
        });
      }
    );
  }
};

module.exports = {
  addTodo,
};
