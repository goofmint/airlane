module.exports = {
  development: {
    session_key: 'H6DKBXj4o5WQAXJLf8S5VAWGEhpakF',
    view_engine: 'jade',
    database: {
      driver: 'sqlite',
      host: 'localhost',
      username: 'username',
      password: 'password',
      database: 'todo_development'
    },
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    }
  }
}