import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, Marker, ZoomControl } from 'react-mapbox-gl';
import Title from '../Title';
import './marker.css';

const MapElem = ({
	title,
	buildingCoordinates
}) => {
	const [values, setValues] = useState({
		name: title,
		longitude: buildingCoordinates[0],
		latitude: buildingCoordinates[1]
	})

	useEffect(() => {
		setValues({
			name: title,
			longitude: buildingCoordinates[0],
			latitude: buildingCoordinates[1]
		})
	}, [])

	const Map = ReactMapboxGl({
		accessToken:
			'pk.eyJ1IjoidHJpYXp1ciIsImEiOiJja25qNWdmOXczdzQwMnhwOWZjbWVkY2tpIn0.clQlEHnoJvgDUppq8GQG_A'
	});


	return (
		<div>
			<Title>
				{title}
			</Title>
			<Map
				style="mapbox://styles/triazur/ck4oeg8gg0v4q1co4pyhsqjlr"
				containerStyle={{
					height: '35vh',
					width: '100vw'
				}}
				zoom={[15]}
				center={buildingCoordinates}
			>
				{/* <Layer type="symbol" id="marker" layout={{ 'icon-image': "monument-15" }}>
					<Feature coordinates={buildingCoordinates} />
				</Layer> */}
				<Layer
					type="circle"
					id="marker"
					paint={{
						"circle-color": "#ff5200",
						"circle-stroke-width": 0.5,
						"circle-stroke-color": "#fff",
						"circle-stroke-opacity": 0.5
					}}
				>
					<Feature
						coordinates={[2.326763, 48.804668]}
					/>
				</Layer>
				<Layer
					type="circle"
					id="marker"
					layout={{ 'icon-image': 'marker-15' }}
					paint={{
						"circle-color": "blue",
						"circle-stroke-width": 0.5,
						"circle-stroke-color": "#fff",
						"circle-stroke-opacity": 0.5
					}}
				// onMouseEnter={() => {
				// 	alert('HELLO')
				// }}
				>
					{/* <Feature
						coordinates={[2.326876 + 0.01, 48.804621]}
						style={{ cursor: 'pointer' }}
						onClick={() => {
							alert('HELLO')
						}}
					/> */}
					<Feature coordinates={[2.326876, 48.804621]} />
				</Layer>
				{/* <Marker
					longitude={values.longitude}
					latitude={values.latitude}>
					<div className="marker temporary-marker"><span></span></div>
				</Marker> */}
			</Map>
		</div>
	);
}

export default MapElem;
