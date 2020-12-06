const courses = require("../models/courses");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

const getAllCourses = (request, response) => {
 courses.courses.find((error, course) => {
    if (error) {
      return response.status(500).send({ message: error.message });
    } else {
      return response.status(200).send(course);
    }
  });
};

const createNewCourses = (request, response) => {
  const course = new courses.courses(request.body);
 
course.save((error) => {
    if (error) {
      return response.status(500).send({message: error.message,});
    } else {
      return response.status(201).send(course.toJSON());
    }
  });
};

const updateCourses = (request, response) => {
  const id = request.params.id;

courses.courses.find({ id }, (error, course) => {
    if (course.length > 0) {
      courses.courses.updateMany(
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
      return response.status(200).send({ message: "Não existe cursos para atualizar" });
    }
  });
};

const deleteCourses = (request, response) => {
  const id = request.params.id;
  courses.courses.find({ id }, (error, course) => {
    if (course.length > 0) {
        courses.courses.deleteMany({ id }, (error) => {
        if (error) {
          return response.status(500).send({ message: erro});
        }
        return response.status(200).send({message: "courses successfully deleted",});
      });
    } else {
      return response.status(200).send({message: "Não existe cursos para deletar" });
    }
  });
};

module.exports = {
  getAllCourses,
  createNewCourses,
  updateCourses,
  deleteCourses,
};