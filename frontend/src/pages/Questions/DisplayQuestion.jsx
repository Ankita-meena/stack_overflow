import React from 'react'
import Comments from '../../comments/Comments'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionDetails from './QuestionDetails'


const DisplayQuestion = () => {
  return (
    <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
              <QuestionDetails/>
                <RightSidebar />
            <Comments
        commentsUrl="http://localhost:3000/comments"
        currentUserId="1"
        />
        </div>
        </div>
  )
}

export default DisplayQuestion