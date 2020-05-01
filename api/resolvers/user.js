const User = require('./../../http/models/user');
const catchError = require('./../../utils/catchError');
const AppError = require('./../../utils/error');
module.exports = {
    Query: {
        getAlluser: async() => {
            const users = await User.find();
            return users;
        }

    },
    Mutation: {
        signup: catchError(async(_, { input }) => {
            const user = await User.create({
                username: input.username,
                email: input.email,
                password: input.password,
                confirmpassword: input.confirmpassword
            });
            return user;

        }),
        login: catchError(async(_, { input }) => {
            const user = await User.findOne({ username: input.username }).select('+password');
            if (!user || !(await user.comparePassword(input.password, user.password))) {
                return new AppError('User not found', 400);
            }
            const token = "ok";
            return { token };
        })
    }
};