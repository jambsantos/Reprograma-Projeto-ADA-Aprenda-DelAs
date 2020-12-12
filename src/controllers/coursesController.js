const courses = require("../models/coursesSchema");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

const getAllCourses = (request, response) => {
 courses.find((error, course) => {
    if (error) {
      return response.status(500).send({ message: error.message });
    } else {
      return response.status(200).send(course);
    }
  });
};

const createNewCourses = (request, response) => {
const course = new courses(request.body);
course.save((error) => {
    if (error) {
      return response.status(500).send({message: error.message,});
    } else {
      return response.status(201).send(course);
    }
  });
};

const updateCourses = (request, response) => {
const id = request.params.id;
courses.findById({ id }, (error, course) => {
    if (course.length > 0) {
      courses.findByIdAndUpdate(
        { id },
        { $set: request.body },
        (error) => {
          if (error) {
            return response.status(500).send({message: error.message,});
          }
          return response.status(200).send({message: "Course changed successfully" });
        }
      );
    } else {
      return response.status(404).send({ message: "Course not found" });
    }
  });
};

const deleteCourses = (request, response) => {
  const id = request.params.id;
  courses.findById({ id }, (error, course) => {
    if (course.length > 0) {
        courses.findByIdAndDelete({ id }, (error) => {
        if (error) {
          return response.status(500).send({ message: erro});
        }
        return response.status(200).send({message: "courses successfully deleted",});
      });
    } else {
      return response.status(404).send({message: "User not found" });
    }
  });
};

const getFreeCourses = (request, response) => {
  const flag = request.query.free
  courses.find(
    { free: flag },
    {  name: 1, type: 1, field: 1, level:1, host: 1, community: 1, link: 1, _id: 0 },
    (err, course) => {
      if (err) {
        return response.status(500).send({ message: err.message });
      } else if (course) {
        return response.status(200).send(course);
      }
      response.status(404).send("Courses Free not found!");
    }
  );
};

const getCommunityCourses = (request, response) => {
  const flag = request.query.community
  courses.find(
    {community: flag },
    { name: 1, type: 1, field: 1, level:1, host: 1, free: 1, link: 1, _id: 0 },
    (err, course) => {
      if (err) {
        return response.status(500).send({ message: err.message });
      } else if (course) {
        return response.status(200).send(course);
      }
      response.status(404).send("Community not found!");
    }
  );
};

const getTipyCourses = (request, response) => {
  const flag = request.query.tipy
  courses.find(
    { tipy: flag },
    { name: 1, field: 1, level:1, host: 1, free:1, community: 1, link: 1, _id: 0 },
    (err, course) => {
      if (err) {
        return response.status(500).send({ message: err.message });
      } else if (course) {
        return response.status(200).send(course);
      }
      response.status(404).send("Courses type not found!");
    }
  );
};

const  getLevelFreeCourses= (request, response) => {
  const level = request.query.level;
  const free = request.query.free;

 courses.find({level:level, free:free}, function (err, course) {
      if (err) {
          response.status(500).send({ message: err.message })
      } else {
          response.status(200).send(course)
      }
  });
};

const getFieldCourses = (request, response) => {
  const flag = request.query.field
  courses.find(
    { field: flag },
    { name: 1, type: 1, level:1, host: 1, free:1, community: 1, link: 1, _id: 0 },
    (err, course) => {
      if (err) {
        return response.status(500).send({ message: err.message });
      } else if (course) {
        return response.status(200).send(course);
      }
      response.status(404).send("Courses field not found!");
    }
  );
};

module.exports = {
  getAllCourses,
  createNewCourses,
  updateCourses,
  deleteCourses,
  getTipyCourses,
  getFieldCourses,
  getLevelFreeCourses,
  getFreeCourses,
  getCommunityCourses
};