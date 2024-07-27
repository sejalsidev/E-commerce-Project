const express = require('express');
const { DataConnection } = require('./DatabaseConnection');
const userRouter = require('./Router/userRouter');
const categoryRouter = require('./Router/categoryRouter');
const productRouter = require('./Router/productRouter');
const orderRouter = require('./Router/orderRouter');
const app = express();
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./Model/usergoogleModel");

// connect the frontend
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const clientId = "52562542494-svo2nn6na12j6isrmisqp10tlg6dd9q8.apps.googleusercontent.com";
const clientSecretKey = "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";

// setup session
app.use(session({
    secret: "sejal@#$%6%",
    resave: false,
    saveUninitialized: true
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientId,
        clientSecret: clientSecretKey,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile);
            try {
                let user = await userdb.findOne({ googleId: profile.id });
                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// initial google auth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/login"
}));

app.use(express.json());

app.get('', (req, res) => {
    res.send("done");
});

app.use("/uploads", express.static("uploads"));
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// ------------------------------------------Database-Connection------------------------------------------------

DataConnection().then(() => {
    app.listen(9000, () => {
        console.log('server running on port 9000');
    });
}).catch((e) => {
    console.log("Error", e);
});
