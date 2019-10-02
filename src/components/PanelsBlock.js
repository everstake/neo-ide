import React from 'react';
import '../stylesheets/ide.css'
import MainPanel from './MainPanel'



class PanelsBlock extends React.Component {

    render() {
        return (

<div className="App" >
                   <MainPanel/>
</div>

        );
    }
}

export default PanelsBlock;