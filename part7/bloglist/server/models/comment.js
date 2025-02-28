const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true, minlength: 3 },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if ('_id' in returnedObject) {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
    if ('__v' in returnedObject) {
      delete returnedObject.__v
    }
  }
})

module.exports = mongoose.model('Comment', commentSchema)
