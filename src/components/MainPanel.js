import React from 'react';


import HorizontalPanel from './HorizontalPanel'
class MainPanel extends React.Component {

componentDidMount() {
    console.log("main panel loaded")
}

    render() {
        return (
            <HorizontalPanel/>
    )


    }


}

export default MainPanel;