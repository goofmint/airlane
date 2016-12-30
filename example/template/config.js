module.exports = {
  development: {
    session_key: 'uDOUJqJ79maU7GQIpab8cTJYBmHNZT',
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
      database: 'template_development'
    }
  },
  test: {
    session_key: '2skATTnEvdYyZz4mFtJYKA3JgYWPeo',
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
      database: 'template_test'
    }
  },
  production: {
    session_key: 'Y0eFYTSJpWSoRRNmwleK8NoFFje7H0',
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
      database: 'template_test'
    }
  }
}