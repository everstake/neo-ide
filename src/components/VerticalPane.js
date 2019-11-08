import React from 'react';


class VerticalPane extends React.Component {


    onMouseDown({target: resizer, pageX: initialPageX, pageY: initialPageY}) {
        //   let e = new Emitt();
        console.log(resizer.className.match('h-multipane-resizer'));
        console.log("init");
        console.log(initialPageY);
        //  this.userSelect();
        if (resizer.className && resizer.className.match('h-multipane-resizer')) {
            let self = this;
            let {$el: container, layout} = self;
            // resizer.ta
            let pane = resizer.previousElementSibling;
            let nextPane = resizer.nextElementSibling;


            let {
                offsetWidth: initialPaneWidth,
                offsetHeight: initialPaneHeight
            } = pane;


            let usePercentage = !!(pane.style.height + '').match('%');

            const {addEventListener, removeEventListener} = window;

            const resize = (initialSize, offset = 0) => {
                let containerHeight = container.clientHeight;
                let paneHeight = initialSize + offset;
                nextPane.style.height = 100 - (paneHeight / containerHeight * 100) + '%';
                return (pane.style.height = usePercentage
                    ? paneHeight / containerHeight * 100 + '%'
                    : paneHeight + 'px')
            };

            // This adds is-resizing class to container
            self.state.isResizing = true;

            // Resize once to get current computed size
            let size = resize();

            // Trigger paneResizeStart event
            //  e.emit('paneResizeStart', pane, resizer, size);

            const onMouseMove = function ({pageX, pageY}) {
                size = resize(initialPaneHeight, pageY - initialPageX);
                //self.$emit

                //    e.emit('paneResize', pane, resizer, size)
                //self.$emit('paneResize', nextPane, resizer, size)
            };

            const onMouseUp = function () {
                // Run resize one more time to set computed width/height.
                size = pane.clientHeight;

                // This removes is-resizing class to container
                self.state.isResizing = false;


                removeEventListener('mousemove', onMouseMove);
                removeEventListener('mouseup', onMouseUp);

                //   e.emit('paneResizeStop', pane, resizer, size)
            };

            addEventListener('mousemove', onMouseMove);
            addEventListener('mouseup', onMouseUp);
        }

    };


    render() {

        return (
            <div className='vertical-pane' onMouseDown={this.onMouseDown}>
                <slot/>
            </div>


        );
    }

}

export default VerticalPane;