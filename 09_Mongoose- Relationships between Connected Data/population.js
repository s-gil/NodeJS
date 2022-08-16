//population.js
//------------------------------------------------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const Author = mongoose.model('Author', new mongoose.Schema({
    name:String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name:String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website){
    let author = new Author({
        name,
        bio,
        website
    });
    author = await author.save();
    console.log(author);
}

async function createCourse(name, author){
    let course = new Course({
        name: name,
        author: author
    });
    course = await course.save();
    console.log(course);
}

async function listCourses(){
    const courses = await Course
        .find()
        .populate('author', 'name')
        .select('name author');
    
    console.log(courses);
    
}

// createAuthor('Sebastian', 'MyBio', 'My Website');
// createCourse('My Course', '62f16ce495d56688b86b79d9');
listCourses();