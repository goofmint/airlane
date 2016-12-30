module.exports = {
  development: {
    session_key: '${randomstring.generate(30)}',
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
    session_key: '${randomstring.generate(30)}',
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
    session_key: '${randomstring.generate(30)}',
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