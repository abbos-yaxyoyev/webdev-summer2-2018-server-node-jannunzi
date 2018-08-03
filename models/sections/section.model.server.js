const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server');

findAllSections = () =>
  sectionModel.find();

findAllSectionsForCourse = courseId =>
  sectionModel.find({courseId: courseId});

createSection = section =>
  sectionModel.create(section);

enroll = (userId, sectionId) =>
  userModel.findUserById(userId)
    .then(user => {
      user.sections.push(sectionId);
      return user.save();
    })

module.exports = {
  enroll,
  findAllSections,
  findAllSectionsForCourse,
  createSection
};