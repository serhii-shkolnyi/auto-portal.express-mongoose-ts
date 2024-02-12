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

db.createCollection("showrooms");
db.showrooms.insertOne({
  showroom: "auto-portal",
  createdAt: new Date(),
  updatedAt: new Date(),
});
const entity = db.showrooms.findOne();
if (entity.showroom === "auto-portal") {
  const autoPortalId = entity._id;

  db.createCollection("roles");
  db.roles.insertMany([
    {
      role: "admin",
      _showroomId: ObjectId(autoPortalId),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role: "manager",
      _showroomId: ObjectId(autoPortalId),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role: "seller",
      _showroomId: ObjectId(autoPortalId),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
