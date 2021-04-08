import React, { Component } from 'react';
import { useLocation, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faClipboard,
    faPen,
    faBars,
    faPlusCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

import Tab from './subcomponents/Tab';

class Farm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            name: "loading...",
            location: "loading...",
            description: "loading...",
            animalPresets: this.props.presets,
            alerts: []
        }
    }

    componentDidMount() {
        if(this.props.farms.length <= this.state.id){
            this.props.history.push("/home/farms");
            return
        }
        else{
            this.props.getFarmDetail(this.state.id)
        }
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.props.farms !== prevProps.farms) {
            this.setState({
                    ...(this.props.farms[prevState.id]),
                    id:prevState.id,
                    animalPresets: this.props.presets,
                })
        }
        if (this.props.presets !== prevProps.presets) {
            this.setState({
                    ...prevState,
                    animalPresets: this.props.presets,
                })
        }
    }
    render() {
        const url = "/home/farms/"+String(this.state.id);
        return (
            <div className="farm-back">
                <div className="farm-main-container">
                    <div className="inner-main-container pt-2 pb-2">
                        <Link to={url+"/remove-farm"}>
                            <FontAwesomeIcon className="top-icon" icon={faTrashAlt} size="2x" />
                        </Link>
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faBars} size="2x" />
                        </Link>
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faPen} size="2x" />
                        </Link>
                        <p className="farm-name">{this.state.name}</p>
                        <div>
                            <FontAwesomeIcon className="farm-icon" icon={faMapMarkerAlt} size="2x" />
                            <p className="farm-text">{this.state.location}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="farm-icon" icon={faClipboard} size="2x" />
                            <p className="farm-text">{this.state.description}</p>
                        </div>
                    </div>
                </div>
                <div className="inner-main-container row pt-2 pb-2">
                    
                    <Link to={url+"/create-preset"} className="tab-small">
                        <p className="tab-add"><FontAwesomeIcon icon={faPlusCircle} /></p>
                    </Link>
                </div>
            </div>
        )
    }
};

export default Farm;
