db.auth('root', 'supersecret123');

db = db.getSiblingDB('testapp');

db.createUser({
  user: 'appaccess',
  pwd: 'secret123',
  roles: [
    {
      role: 'readWrite',
      db: 'testapp'
    }
  ]
});
