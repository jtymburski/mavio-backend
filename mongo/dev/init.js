db.auth('root', 'supersecret123');

db = db.getSiblingDB('devapp');

db.createUser({
  user: 'appaccess',
  pwd: 'secret123',
  roles: [
    {
      role: 'readWrite',
      db: 'devapp'
    }
  ]
});
