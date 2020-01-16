
import * as React from "react";
// import { observer } from "mobx-react";
import classnames from "classnames";
// import { injectIntl } from 'react-intl';
import "./index.less";
import Button from "@material-ui/core/Button";
interface IProps
{
	onClick?: () => void;
	style?: object;
	disabled?: boolean;
	text: string;
	btnSize?: "sm-btn"|"bg-btn";
	btnColor?: "white-btn"|"gray-btn"|"blue-btn"|"";
	// intl:any
}

// @observer
export default class ButtonDebug extends React.Component<IProps, {}> {
    constructor(props: IProps)
    {
        super(props);
    }

	public onClick = () =>
	{
	    if(this.props.disabled) {
	        return false;
	    }
	    if (this.props.onClick)
	    {
	        this.props.onClick();
	    }
	    return true;
	}

	public render()
	{
	    const btnClassName = classnames("normal-button",this.props.btnSize,this.props.btnColor);
	    // this.props.smallbtn ? 'blue-btn' : 'button-group';

	    return (
	        <Button className={btnClassName}
	            onClick={this.onClick}
	            style={this.props.style}
	        >
	            {this.props.text}
	        </Button>
	    );
	}
}
