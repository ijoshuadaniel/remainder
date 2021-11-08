const express = require('express');
const Cors = require('cors');
const app = express();
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const { connection } = require('./database');

const { handleSignUp } = require('./auth/signup');
const { handleLogin } = require('./auth/login');
const { addTodo } = require('./todo/addTodo');
const { getTodo } = require('./todo/getTodo');
const { deleteTodo } = require('./todo/deleteTodo');

app.use(express.json(), Cors());

let transporter = nodemailer.createTransport({
  host: 'titan.int3rnet.net',
  port: 587,
  secure: false,
  auth: {
    user: 'email@joshuadaniel.me',
    pass: 'UeLeomQebwhN',
  },
});

app.use('/signup', (req, res) => {
  handleSignUp(req, res, req.body.body);
});
app.use('/login', (req, res) => {
  handleLogin(req, res, req.body.body);
});

app.use('/add', addTodo);
app.use('/get', getTodo);
app.use('/delete', deleteTodo);

const dateArrange = (data) => {
  const dCpy = data.toString();
  if (dCpy.length > 1) return data;
  return '0' + data;
};

async function sendMail(item) {
  try {
    let info = await transporter.sendMail({
      from: 'email@joshuadaniel.me', // sender address
      to: item.email, // list of receivers
      subject: 'Remainder form `Your Remainder`', // Subject line
      html: `<p>Title : ${item.title}</p><p>Description : ${item.description}</p><p></p><p>Thanks</p><p>Your Remainder</p>`, // html body
    });
    // console.log(info);
  } catch (error) {
    console.log(error.message);
  }
}
const deleteRemainder = (id) => {
  connection.query(
    'Delete FROM `todo` WHERE `id` = ? ',
    [id],
    (error, result) => {
      return;
    }
  );
};

cron.schedule('* * * * *', () => {
  const date = new Date();
  const today = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const min = date.getMinutes();

  const currentDate = `${year}-${dateArrange(month)}-${dateArrange(today)}`;
  const currentTime = `${dateArrange(hours)}:${dateArrange(min)}`;

  connection.query(
    'SELECT * FROM `todo` WHERE `date` = ? AND `time` = ?',
    [currentDate, currentTime],
    (err, result) => {
      if (err) return;
      if (result.length > 0) {
        result.forEach((item) => {
          sendMail(item);
          deleteRemainder(item.id);
        });
      }
    }
  );
});

const port = 150;
app.listen(port, () => console.log(`Running at ${port}`));
