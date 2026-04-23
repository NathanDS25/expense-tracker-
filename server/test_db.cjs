const mongoose = require('mongoose');

const uri = 'mongodb://nathanneildsouza2021_db_user:gOKUkYEqNEiC2Nqs@ac-qxx6ph3-shard-00-00.cnfepvo.mongodb.net:27017,ac-qxx6ph3-shard-00-01.cnfepvo.mongodb.net:27017,ac-qxx6ph3-shard-00-02.cnfepvo.mongodb.net:27017/expense_tracker?ssl=true&replicaSet=atlas-qxx6ph3-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('SUCCESS CONNECT');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAIL CONNECT:', err.message);
    process.exit(1);
  });
