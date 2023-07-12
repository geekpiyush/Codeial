const mongoose = require('mongoose');

const db= main().catch(err=>console.log(err));
async function main()
{
    await mongoose.connect('mongodb://127.0.0.1/codial_app')

    console.log('database successfully connected');
}

module.exports = db;