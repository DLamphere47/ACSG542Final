const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

class MessageClass {
  static publicFields() {
    return ['id', 'slug', 'content'];
  }

  static async createMessage({ id, content }) {
    const slug = await generateSlug(this, content);

    const newMessage = await this.create({
      createdAt: new Date(),
      id,
      content,
      slug,
    });

    return _.pick(newMessage, MessageClass.publicFields());
  }
}

mongoSchema.loadClass(MessageClass);

const Message = mongoose.model('Message', mongoSchema);

module.exports = Message;
