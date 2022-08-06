//solution
//--------------------------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('Could not connect to mongoDb...'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema); 

async function removeCourse(id) { 
    // deleting one document

    const result = await Course.deleteOne({_id: id})
    console.log(result);
    
    // //deleting multiple documents

    // const result = await Course.deleteMany({isPublished: false});
    // console.log(result);

}

removeCourse('5a68fdc3615eda645bc6bdec');

//console
// C:\Users\sebastian\Desktop\nodejs\07_CRUD Operations Using Mongose>node index.js

//output
// connected to mongoDB...
// { acknowledged: true, deletedCount: 1 }