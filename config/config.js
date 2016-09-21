export default {
        database: 'book',
        username: '',
        password: '',
        params: {
            dialect: 'mongodb',
            storage: `${process.env.NODE_ENV}_books.sqlite`,
            define: {
                underscore: true
            }
        },
        jwtSecret: 'P@ss',
        jwtSession: { session: false }
};
