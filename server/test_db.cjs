const mongoose = require('mongoose');

const uri = 'mongodb+srv://nathanneildsouza2021_db_user:gOKUkYEqNEiC2Nqs@expesne.cnfepvo.mongodb.net/expense_tracker?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS CONNECT');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAIL CONNECT:', err.message);
    process.exit(1);
  });
