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
  Query: {
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
    createPage: async (parent, {
      title
    }, {
      models
    }, info) => {
      const Page = await models.Page.findOne({
        title
      });
      if (Page) {
        throw new Error('Please provide a unique title.');
      }
      const newPage = new models.Page({
        title
      });
      try {
        const data = await newPage.save();
        return data;
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