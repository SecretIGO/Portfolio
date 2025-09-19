// Language Categories Constants

export const LANGUAGE_CATEGORIES = {
  frontend: [
    'Bootstrap', 'Chakra UI', 'CSS', 'Emotion', 'HTML', 'JavaScript', 'jQuery',
    'Material-UI', 'SCSS', 'Sass', 'Styled Components', 'Tailwind CSS', 'TypeScript'
  ],
  backend: [
    'C', 'C#', 'C++', 'Clojure', 'Crystal', 'Dart', 'Elixir', 'Erlang', 'F#', 'Go',
    'Haskell', 'Java', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'Nim', 'Node.js', 'Perl',
    'PHP', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'Swift', 'Zig'
  ],
  framework: [
    'Actix', 'Android SDK', 'Angular', 'ASP.NET', 'Cordova', 'Django', 'Echo', 'Electron',
    'Express', 'FastAPI', 'Fiber', 'Flask', 'Flutter', 'Gatsby', 'Gin', 'Ionic',
    'Jetpack Compose', 'Laravel', 'Next.js', 'Nuxt.js', 'PhoneGap', 'React',
    'React Native', 'Rocket', 'Ruby on Rails', 'Spring', 'Spring Boot', 'Swift UI',
    'Svelte', 'Tauri', 'Vue.js', 'Warp', 'Xamarin'
  ],
  libraries: [
    'ActiveRecord', 'AndroidX', 'Apollo', 'Axios', 'Chart.js', 'Cypress', 'D3.js',
    'Entity Framework', 'GraphQL', 'Hibernate', 'Jest', 'Lodash', 'Moment.js',
    'Mongoose', 'NumPy', 'OpenCV', 'Pandas', 'Playwright', 'Prisma', 'PyTorch',
    'Scikit-learn', 'Sequelize', 'Selenium', 'Socket.io', 'TensorFlow', 'Three.js',
    'TypeORM'
  ],
  database: [
    'Amazon RDS', 'Azure SQL', 'Cassandra', 'CouchDB', 'DynamoDB', 'Elasticsearch',
    'Firebase', 'Google Cloud SQL', 'InfluxDB', 'MariaDB', 'MongoDB', 'MySQL',
    'Neon', 'Neo4j', 'Oracle', 'PlanetScale', 'PostgreSQL', 'Redis', 'SQL Server',
    'Solr', 'SQLite', 'Supabase', 'TimescaleDB', 'Turso'
  ]
} as const;

export const CATEGORY_ORDER = ['frontend', 'backend', 'framework', 'libraries', 'database', 'other'] as const;

export type LanguageCategory = keyof typeof LANGUAGE_CATEGORIES | 'other';
