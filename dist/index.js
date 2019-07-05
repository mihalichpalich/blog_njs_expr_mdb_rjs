'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Post = require('./models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_mongoose2.default.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useFindAndModify: false });

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/posts', function (req, res) {
  var data = req.body;

  var post = new _Post2.default({
    title: data.title,
    text: data.text
  });

  post.save().then(function () {
    res.send({ status: 'ok' });
  });
});

app.get('/posts', function (req, res) {
  _Post2.default.find().then(function (err, posts) {
    if (err) {
      return res.send(err);
    }

    res.json(posts);
  });
}); //обработчик для получения записей

app.delete('/posts/:id', function (req, res) {
  _Post2.default.deleteOne({
    _id: req.params.id
  }).then(function (post) {
    if (post) {
      res.json({ status: 'deleted' }); //если запись возвращается, то она удалена
    } else {
      res.json({ status: 'error' });
    }
  });
}); //обработчик для удаления записей (запрос delete)

app.put('/posts/:id', function (req, res) {
  _Post2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
    //в св-ве $set хранятся новые данные
    if (err) {
      return res.send(err);
    }

    res.json({ status: 'updated' });
  });
}); //обработчик для обновления записей (запрос put)

app.listen(3333, function () {
  console.log('СЕРВЕР ЗАПУЩЕН!');
});

// const posts = [
//   {
//   	title: 'Товарищи!',
//   	text: 'сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям. Таким образом рамки и место обучения кадров в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же укрепление и развитие структуры способствует подготовки и реализации соответствующий условий активизации. Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности требуют от нас анализа соответствующий условий активизации.'
//   },
//   {
//   	title: 'Задача организации',
//   	text: 'Равным образом новая модель организационной деятельности играет важную роль в формировании новых предложений. Товарищи! реализация намеченных плановых заданий способствует подготовки и реализации систем массового участия. Равным образом укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.'
//   },
//   {
//   	title: 'Равным образом',
//   	text: 'Таким образом постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Равным образом новая модель организационной деятельности позволяет оценить значение существенных финансовых и административных условий. Разнообразный и богатый опыт рамки и место обучения кадров способствует подготовки и реализации модели развития.'
//   }
// ]; //список статей