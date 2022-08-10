const env = process.env;

export const config = () => ({
  database: {
    type: 'mysql',
    host: env.HOST ?? 'localhost',
    port: Number(env.DB_PORT) ?? 3306,
    username: env.DB_USERNAME ?? 'StarGo',
    password: env.DB_PASSWORD ?? 'StarGo',
    database: env.DB_NAME ?? 'todolist',
    synchronize: false,
    logging: false,
    entities: ['dist/**/entities/*.entity.js'],
  },
});
