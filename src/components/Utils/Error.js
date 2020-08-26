import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div className="error-container">
                <h3 className="text-center">{this.props.error}</h3>
            </div>
        )
    }
}

export default Error;