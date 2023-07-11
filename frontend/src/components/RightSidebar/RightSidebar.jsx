import React from 'react'
import './RightSidebar.css'
import Widget from './Widgets'
import WidgetTags from './WidgetTags'

const RightSidebar = () => {
    return (
        <aside className='right-sidebar'>
            <Widget />
            <WidgetTags />
        </aside>
    )
}

export default RightSidebar