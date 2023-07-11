import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar,faPen} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import {getlocation} from "../../api/index"
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UserProfile.css'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)
    const [latitude, setLatitude] = useState(false)
    const [longitude, setLongitude] = useState(false)
    const [country, setCountry] = useState("")

useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        getlocation(coords.latitude,coords.longitude).then(el=>{
            console.log(el.data.data.results[0].components)
            setCountry(el.data.data.results[0].components)
        })

      }, (error) => {
         console.log('Something went wrong getting your position!')
      })
}, [])
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faCalendar} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                                <p>location: {country.state_district},{country.state},{country.country}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            ) 
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                            ) : (
                                <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile