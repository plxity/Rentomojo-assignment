import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike} from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  post: { _id, text, likes,  date, dislikes, name},
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <h1>{name}</h1>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p> 
    </div>
    <div>
      <p className='my-1'>{text}</p>
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />{' '}
            
            <span>{dislikes.length}</span>
          </button>
        </Fragment>
     
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike}
)(PostItem);
