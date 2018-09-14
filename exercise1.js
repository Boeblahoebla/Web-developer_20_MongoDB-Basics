//////////////
// Imports //
////////////

const mongoose = require('mongoose');

/////////////////
// Connection //
///////////////

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .catch(err => console.log('Could not connect to DB...', err));

/////////////
// Schema //
///////////

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

////////////
// Model //
//////////

const Course = mongoose.model('Courses', courseSchema, 'coursecollection');

///////////
// CRUD //
/////////

// Exercise 1
async function getCourses1() {
    return await Course
        .find({tags: 'backend', isPublished: true})
        .select({name: 1, author: 1})
        .sort({name: 1, author: 1});
}

async function showCourses() {
    const courses = await getCourses1();
    console.log(courses);
    console.log("");
}

//showCourses();


// Exercise 2
async function getCourses2() {
    return await Course
        .find({tags: {$in: ['frontend', 'backend']}, isPublished: true})
        .select({name: 1, author: 1})
        .sort({price: -1});
}

async function showCourses2() {
    const courses = await getCourses2();
    console.log(courses);
    console.log("");
}
//showCourses2();


// Exercise 3
async function getCourses3() {
    return await Course
        .find({ isPublished: true })
        .or([
            {price: {$gte: 15} },
            {name: /.*by.*/i }
        ])
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1});
}

async function showCourses3() {
    const courses = await getCourses3();
    console.log(courses);
    console.log("")
}

//showCourses3();




