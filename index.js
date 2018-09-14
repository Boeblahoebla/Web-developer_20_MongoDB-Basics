//////////////
// Imports //
////////////

const mongoose = require('mongoose');

/////////////////
// Connection //
///////////////

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to DB...', err));

/////////////
// Schema //
///////////

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

////////////
// Model //
//////////

// Create a class from the schema
const Course = mongoose.model('Course', courseSchema);

///////////
// CRUD //
/////////

// Create and add a Course to the db
async function createCourse() {
    const course = new Course({
        // name: 'Photoshop',
        author: 'Dzengiz',
        tags: ['Multimedia', 'Photo'],
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);

    } catch (e) {
        console.log(e.message);
    }
}

createCourse();


async function getCourses() {
    // comparison operators
    // .. eq (equal)
    // .. ne (not equal)
    // .. gt (greater than)
    // .. gte (greater than or equal to)
    // .. lt (less than)
    // .. lte (less than or equal to)
    // .. in (in - contains)
    // .. nin (not in - not contains)

    const course = await Course
        .find();
    console.log(course);
}
//getCourses();


async function updateCourse() {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()

    const course = await Course.findOneAndUpdate({name: /.*HT.*/}, {
        $set: {
            name: 'HTML - CSS - Bootstrap',
            author: 'Dzengiz Tafa'
        }
    }, { new: true });
    console.log(course);

    // Approach: Update first
    // update directly
    // Optionally: get updated document
}
//updateCourse();


async function deleteCourse(tag) {
    const result = await Course.deleteOne({tags: tag});
    console.log(result);
}
//deleteCourse('HTML');








