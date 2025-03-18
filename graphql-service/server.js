require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema/userSchema");
const resolvers = require("./resolvers/userResolver");

const app = express();
app.use(require("cors")());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
.catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    });
}

startServer();
