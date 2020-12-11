const courses = require("../models/coursesSchema");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

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
  const course = new courses.courses(request.body);
 
course.save((error) => {
    if (error) {
      return response.status(424).send({message: error.message,});
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

// const getTipyCourses = (req, res) => {
//   const parametros = req.query
//   articles.find(parametros, function (err, articles) {
//       if (err) {
//           res.status(500).send({ message: err.message })
//       } else {
//           res.status(200).send(articles)
//       }
//   })
// }


// const candidateById = (req, res) => {
//   const id = req.params.id;
//   candidatesModel.findById(id, (err, candidate) => {
//     if (err) {
//       res.status(424).send({ message: err.message });
//     } else if (candidate) {
//       return res.status(200).send(candidate);
//     }
//     res.status(404).send("Candidate not found!");
//   });
// };

// const candidatesByCity = (req, res) => {
//   const city = req.params.cidade;
//   candidatesModel.find(
//     { cidade: city },
//     { nomeSocial: 1, email: 1, movimentoSocial: 1, partido: 1, _id: 0 },
//     (err, candidates) => {
//       if (err) {
//         return res.status(424).send({ message: err.message });
//       } else if (candidates) {
//         return res.status(200).send(candidates);
//       }
//       res.status(404).send("City not found!");
//     }
//   );
// };

// const electedCandidates = (req, res) => {
//   candidatesModel.find(
//     { eleita: true },
//     { nomeSocial: 1, cidade: 1, tipoCandidatura: 1, partido: 1, _id: 0 },
//     (err, candidates) => {
//       if (err) {
//         return res.status(424).send({ message: err.message });
//       } else if (candidates) {
//         return res.status(200).send(candidates);
//       }
//       res.status(404).send("Candidates not found!");
//     }
//   );
// };


module.exports = {
  readAllCourses,
  createNewCourses,
  //readByIDCourses,
  updateCourses,
  deleteCourses,
  //getTipyCourses,
  //getFieldCourses,
  //getLevelCourses,
  //getFreeCourses,
  //getCommunityCourses
};