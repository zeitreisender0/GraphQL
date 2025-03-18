const User = require("./models/User");

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    },
  },
};

module.exports = resolvers;
