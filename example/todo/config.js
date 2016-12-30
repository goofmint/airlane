module.exports = {
  development: {
    session: {
      key: 'wwqOA7lRPcQzA0v640p6a23fZOEcSv',
      path: '/tmp/session.nedb'
    },
    view_engine: 'jade',
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    },
    database: {
      driver: 'sqlite',
      host: 'localhost',
      database: 'todo_development'
    }
  },
  test: {
    session: {
      key: 'LBjiMsgije3EqsVvEttaNa4dLA41LU',
      path: '/tmp/session.nedb'
    },
    view_engine: 'jade',
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    },
    database: {
      driver: 'sqlite',
      host: 'localhost',
      database: 'todo_test'
    }
  },
  production: {
    session: {
      key: 'OoHNq0zpWYNtVo9n8bEqa5tzqUR6HJ',
      path: '/tmp/session.nedb'
    },
    view_engine: 'jade',
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    },
    database: {
      driver: 'sqlite',
      host: 'localhost',
      database: 'todo_test'
    }
  }
}