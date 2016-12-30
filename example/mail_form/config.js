module.exports = {
  development: {
    session_key: 'HJFupBSCGRqL9IWWAVRK19M72PbS94',
    view_engine: 'jade',
    smtp: {
      secure: false,
      server: 'localhost',
      port: 2500
    },
    database: {
      driver: 'sqlite',
      host: 'localhost',
      database: 'mail_form_development'
    }
  },
  test: {
    view_engine: 'jade'
  }
}