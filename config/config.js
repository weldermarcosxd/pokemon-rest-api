module.exports = ({
        database: process.env.OMEGA,
        port: 2345,
        jwtSecret: 'P@ss',
        jwtSession: { session: false }
});
