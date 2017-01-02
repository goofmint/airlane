module.exports = {
  development: {
    session: {
      key: '1ChDPtrhUIvSAjI67GVOwLVs57VWSD',
      path: '/tmp/session.nedb'
    },
    view_engine: 'jade',
    smtp: {
      secure: false,
      user: 'app',
      password: 'app',
      server: 'localhost',
      port: 1025,
      ignoreTLS: true
    }
  },
  test: {
    session: {
      key: 'WcVgEMdtmwHEdUEPErN8zM9kinMgTT',
      path: '/tmp/session.nedb'
    },
    view_engine: 'jade',
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    }
  },
  production: {
    session: {
      key: 'x7VOiJFqZb0g65GVnqyAm3gLZruymo',
      path: '/tmp/session.nedb'
    },
    view_engine: 'jade',
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    }
  }
}