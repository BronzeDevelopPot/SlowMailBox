import session from "express-session";

export const sessionConfig = session({
  secret: "ras",
  resave: true,
  saveUninitialized: false,
});