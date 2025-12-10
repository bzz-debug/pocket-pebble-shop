const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { db } = require("../connect.js");
const { findUsers, findUsersById } = require("../api/model.js");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await findUsers(email);
        console.log(user);
        //should I write a test suite to check this is working?
        if (!user) {
          return done(null, false, { error: "incorrect email" });
        }
        //make more generic when pushing to prod, to make more secure
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { error: "incorrect password" });
        }
        //make more generic when pushing to prod, to make more secure
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.admin_id);
  //this method is called when a user successfully logs in. It allows us to specify what information should be stored in the session - typically just the user ID.

  // this is why I wanted to test, to make sure the admin_id is the correct syntax
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await findUsersById(userId);
    if (!user) {
      return done(new Error("user not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
//this method is called on every request after a user logs in. It retrieves the user information, based on the ID stored in the session. This allows us to access the user's data throughout the session without needing to log them in again.
