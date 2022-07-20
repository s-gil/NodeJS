// index.js
//--------------------------------------------------------
const Joi = require('joi'); //return a class
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
];
app.get('/', (req, res) => { 
    res.send('Hello World');
}); 

app.get('/api/courses', (req, res) => { 
    res.send(courses);
}); 

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The Course with the given ID was not found');
        
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Lok up the course
    // If not exist return 404
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The Course with the given ID was not found');
        
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1) // Remove 1 object

    // Return the same course
    res.send(course);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The Course with the given ID was not found');
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
});

//console
// C:\Users\sebastian\Desktop\nodejs\04_Building RESTful API Using Express>node index.js

// output
// listening on port 3000...
// {
//     "id": 2,
//     "name": "new course"
// }