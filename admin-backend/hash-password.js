const bcrypt = require('bcrypt');

(async () => {
  const password = 'admin';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
})();
