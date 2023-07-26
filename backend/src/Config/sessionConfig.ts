import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userData: { _id: number; name: string };
  }
}

export const sessionConfig = session({
  secret: "ras",
  resave: true,
  saveUninitialized: false,
});
