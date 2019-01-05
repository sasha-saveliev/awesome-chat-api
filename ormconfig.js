module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5442,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    'src/common/entities/**/*.entity.ts'
  ],
  migrations: [
    'src/database/migration/**/*.migration.ts'
  ]
}
