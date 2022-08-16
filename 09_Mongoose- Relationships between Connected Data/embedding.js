//population.js
//------------------------------------------------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const authorSchema = new mongoose.Schema({
    name:String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name:String,
    authors: [authorSchema]
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

async function createCourse(name, authors){
    let course = new Course({
        name,
        authors
    });
    course = await course.save();
    console.log(course);
}

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('62f2c1b89ec2b1986249d181', '62f2c3b644b51c630c8d64d2');

// addAuthor('62f2c1b89ec2b1986249d181', new Author({name: 'New Author'}));

// createCourse('Course with several authors', [
//     new Author({name: 'Sebastian'}),
//     new Author({name: 'Julian'})
// ]);

