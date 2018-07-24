import { error } from "util";

export default {
  Question: {
    __resolveType(obj) {
      if(obj.type === 'choice') {
        return 'Choice'
      }
      if(obj.type === 'rating') {
        return 'Rating'
      }
    }
  },
  Quiz: {
    pages: (quiz, args, { models }) => models.Page.find({quiz: quiz._id })
  },
  Page: {
    quiz: (page, args, { models }) => models.Quiz.findById(page.quiz)
  },
  Query: {
    pages:  async (parent, {type}, { models }, info) => {
      return models.Page.find({});
    },
    quizes:  async (parent, {type}, { models }, info) => {
      return models.Quiz.find({});
    },
    question: async (parent, {type}, { models }, info) => {
      let question;
      if (type === 'CHOICE') {
        question = await models.Choice.find({});
      }
      if (type === 'RATING') {
        question = await models.Rating.find({});
      }
      return question || [];
    },
    questions: async (parent, args, { models }, info) => {
      const [choice, rating] = await Promise.all([
        models.Choice.find({}),
        models.Rating.find({})
      ])
      return [...choice, ...rating];
    }
  },
  Mutation: {
    deleteComponent: async (parent, { id, type }, { models }, info) => {
      try {
        if (type === 'RATING') {
          const { n } = await models.Rating.deleteOne({ _id: id})  
          if (!n) throw new Error('Error')
          return "Ok"
        } else if (type === 'CHOICE') {
          const { n } = await models.Choice.deleteOne({ _id: id}) 
          if (!n) throw new Error('Error')
          return "Ok"
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    createQuiz: async (parent, { title }, { models }, info) => {
      const Quiz = await models.Quiz.findOne({title});
      if (Quiz) {
        throw new Error('Please provide a unique title.');
      }
      const newQuiz = new models.Quiz({
        title
      });
      try {
        return newQuiz.save();
      } catch (e) {
        throw new Error(e);
      }
    },
    createPage: async (parent, { quizId, title }, { models }, info) => {
      const Page = await models.Page.findOne({title});
      if (Page) {
        throw new Error('Please provide a unique title.');
      }
      let count = await models.Page.countDocuments();
      const quiz = await models.Quiz.findById(quizId);
      const newPage = new models.Page({
        title,
        number: count + 1,
        quiz
      });
      try {
        return newPage.save();
      } catch (e) {
        throw new Error(e);
      }
    },
    createComponentChoice: async (parent, { title }, { models }, info) => {
      const Component = await models.Choice.findOne({ title });
      if (Component) {
        throw new Error('Please provide a unique title.');        
      }
      const newComponent = new models.Choice({
        title
      });
      try {
        const data = await newComponent.save();
        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    createComponentRating: async (parent, { title }, { models }, info) => {
      const Component = await models.Rating.findOne({ title });
      if (Component) {
        throw new Error('Please provide a unique title.');        
      }
      const newComponent = new models.Rating({
        title
      });
      try {
        const data = await newComponent.save();
        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};