import React, {Component} from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'


class App extends Component{

    constructor(props){
        super(props);
        this.state={
            user:null,
            information:null,
            stores:[]

        };

    }

    static defaultProps={

        center: {lat: 37.5, lng:128.5},
        zoom:8

    }


  	componentDidMount() {
        fetch("http://165.132.107.94:12001/api")
            .then(res=>res.json())
           .then(data=>this.setState({user: data.username}));
        fetch("http://165.132.107.94:12001/getdata/?name='bike0708'")
            .then(res=>res.json())
            .then(data=>this.setState({stores:data}));
	}

	addMarkers = async (lat,lng) => {
    	const {stores} = this.state;
    	let stateData = stores;
    	let latLng;
    	latLng = {latitude : lat, longitude : lng};
    	stateData.push(latLng);
    	await this.setState({
      		stores: stateData
    	});
  	}

	displayMarkers = () => {
    	return this.state.stores.map((store, index) => {
			return <Marker key={index} id={index} position={store}
     			onClick={() => this.removeMarkers(index)} />
    	})
  	}

    render(){

        return(

                <div className="App">
				{JSON.stringify(this.state.information)}
                <Map google={this.props.google}
                    zoom={this.props.zoom}
                    initialCenter={this.props.center}>
					{this.displayMarkers()}
                </Map>

                {JSON.stringify(this.state.information)}

                </div>
              );}
}





export default GoogleApiWrapper({
    apiKey: ('AIzaSyAaPWcTGC5UbdN6lpTiTXlzhNOThozw6Dk')
}) (App);
