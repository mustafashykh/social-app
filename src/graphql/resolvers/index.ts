import PostResolver from './post';
import AuthResolver from './auth';
import CommentResolver from './comment';
import _ from 'lodash'

const authResolver = new AuthResolver();
const postResolver = new PostResolver();
const commentResolver = new CommentResolver();


export const resolvers = _.merge({}, 
  postResolver.register(),
  authResolver.register(),
  commentResolver.register() 
);