db.createUser({
  user: "user",
  pwd: "user123",
  roles: [
    {
      role: "readWrite",
      db: "auto-portal-express",
    },
  ],
});

db.createCollection("roles");
db.roles.insertOne({
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
});
