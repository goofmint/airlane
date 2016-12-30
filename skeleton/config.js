module.exports = {
  development: {
    session: {
      key: '${randomstring.generate(30)}',
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
      database: '${controllerName.toLowerCase()}_development'
    }
  },
  test: {
    session: {
      key: '${randomstring.generate(30)}',
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
      database: '${controllerName.toLowerCase()}_test'
    }
  },
  production: {
    session: {
      key: '${randomstring.generate(30)}',
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
      database: '${controllerName.toLowerCase()}_test'
    }
  }
}