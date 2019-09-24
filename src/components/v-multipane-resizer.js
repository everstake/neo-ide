import React from 'react';



class v_multipane_resizer extends React.Component {


  render() {
      return (

          <div className="v-multipane-resizer">
        <slot></slot>
      </div>)

}

}


export default v_multipane_resizer;