//index.js
//-------------------------------------------------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.error('Could not connect to mongoDB...'))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/ // Regexp 
    },
    category:{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true 
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v){
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result);
                    }, 4000);
                });
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.isPublished;}, //function(){} can´t be replaced with () => {}
        min: 10,
        max: 20,
        set: v => Math.round(v),
        get: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Nodejs',
        category: ' WeB ',
        author: 'Sebastian',
        tags: ['backend'],
        isPublished: true,
        price: 15.8
    });
    
    try{
        const result = await course.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors) {
            // console.log(ex.errors[field])// for complete trace
            console.log(ex.errors[field].message)// just the message error
        }
    }
}

createCourse();
