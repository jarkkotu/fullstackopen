const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  name: { type: String },
  passwordHash: { type: String, required: true, minlength: 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if ('_id' in returnedObject) {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
    if ('__v' in returnedObject) {
      delete returnedObject.__v
    }
    if ('passwordHash' in returnedObject) {
      delete returnedObject.passwordHash
    }
  }
})

module.exports = mongoose.model('User', userSchema)
