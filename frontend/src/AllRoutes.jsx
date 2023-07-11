import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Chatbot from './components/Chatbot/Chatbot'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Question'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import Subscription from './components/Subscription/Subscription'
import UserProfile from './pages/UserProfile/UserProfile'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Subscription' element={<Subscription/>}/>
            <Route path='/Chatbot' element={<Chatbot/>}/>
            <Route path='/Auth' element={<Auth />} />
            <Route path='/AskQuestion' element={<AskQuestion />} />
            <Route path='/Questions' element={<Questions />} />
            <Route path='/Questions/:id' element={<DisplayQuestion />} />
            <Route path='/Tags' element={<Tags />} />
            <Route path='/Users' element={<Users />} />
            <Route path='/Users/:id' element={<UserProfile />} />
        </Routes>
    )
}

export default AllRoutes