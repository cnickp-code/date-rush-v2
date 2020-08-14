import React from 'react'
import TokenService from '../services/token-service';

const DRContext = React.createContext({
    
});

export default DRContext;

export class DRContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        
        const jwtPayload = TokenService.parseAuthToken()

        if(jwtPayload) {
            this.state.user = {
                user_id: jwtPayload.userId,
                email: jwtPayload.email,
                user_name: jwtPayload.sub
            }
        }
    }

    render() {
        const value = {
            ...this.state
        }

        return (
            <DRContext.Provider value={value}>
                {this.props.children}
            </DRContext.Provider>
        )
    }
}