const courses = require("../models/coursesSchema");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

const getFreeCourses = (req, res) => {
  const flag = req.query.bananinha
  courses.find(
    { free: flag },
    {  name: 1, type: 1, field: 1, level:1, host: 1, community: 1, link: 1, _id: 0 },
    (err, course) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else if (course) {
        return res.status(200).send(course);
      }
      res.status(404).send("Courses Free not found!");
    }
  );
};

const readAllCourses = (request, response) => {
 courses.courses.find((error, course) => {
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
  readAllCourses,
  createNewCourses,
  readByIDCourses,
  updateCourses,
  deleteCourses,
  getTipyCourses,
  getFieldCourses,
  getLevelCourses,
  getFreeCourses,
  getCommunityCourses
};