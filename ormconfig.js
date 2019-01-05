module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5442,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [
    'src/common/entities/**/*.entity.ts'
  ],
  migrations: [
    'src/migration/**/*.migration.ts'
  ]
}
