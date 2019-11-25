import PropTypes from "prop-types";
import React from "react";

class Filter extends React.Component<any, any> {
    static propTypes = {
        value: PropTypes.string.isRequired,
        updateFilter: PropTypes.func,
    };

    handleFilterChange = (event) => {
        const newValue = (this as any).filterRef.value;
        this.props.updateFilter(newValue);
    };

    render() {
        return (
            <input
                // ref="filter"
                ref={el => {
                    (this as any).filterRef = el;
                }}
                type="search"
                placeholder="Filter files"
                value={this.props.value}
                onChange={this.handleFilterChange}
            />
        );
    }
}

export default Filter;
