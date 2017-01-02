module.exports = {
  development: {
    session: {
      key: '7CRxId05cUZDKXubpEdO6oK1aQ4xcV',
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
      host: './',
      database: 'todo_development.sqlite'
    }
  },
  test: {
    session: {
      key: 'RihPhUCmEzFCjopSxra2o2mlA4JweF',
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
      host: './',
      database: 'todo_test.sqlite'
    }
  },
  production: {
    session: {
      key: 'p9ExTc9NrP3Ke51V58LSFtHpnPrcv5',
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
      host: './',
      database: 'todo_test.sqlite'
    }
  }
}