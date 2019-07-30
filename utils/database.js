const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author" //collection name which you want to target
    }
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate("author", "name -_id")
    .select("name author -_id");
  console.log(courses);
}

async function createAuthor(name, bio, web) {
  const author = new Author({
    name,
    bio,
    web
  });

  const res = await author.save();
  console.log(res);
}
//createAuthor("Mosh", "My bio", "My web");
//createCourse("Node Course", "5d3f1e2901c0637d8dd601c1");
listCourses();
