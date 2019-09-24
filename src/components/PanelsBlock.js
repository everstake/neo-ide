import React from 'react';
import '../stylesheets/ide.css'
import HorizontalPanel from './HorizontalPanel'
// import MainPanel from './MainPanel'
 import MultipaneResizer from './h-multipane-resizer'
// import CompilerPanele from './CompilerPanel'


class PanelsBlock extends React.Component {

    render() {
        return (

               <section class="ide">
                    <HorizontalPanel/>
                        <div className="resize-h-body h-pane" style={{flexGrow: 1, maxHeight: '80%', minHeight: '20%', height: '80%'}}>
                        {/*<MainPanel/>*/}
                    </div>
                        <div></div>
                        <MultipaneResizer/>
                    <div className="h-pane" style={{ flexGrow: 1, maxHeight: '80%', minHeight: '20%', height: '20%'}}>
                    {/*<CompilerPanel ref="compiler"/>*/}
                </div>
            {/*</HorizontalPanel>*/}
               </section>


        );
    }
}

export default PanelsBlock;