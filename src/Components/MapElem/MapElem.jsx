import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Title from '../Title';

const MapElem = ({
	title,
	buildingCoordinates
}) => {
	const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoidHJpYXp1ciIsImEiOiJjazRmZmVmcjAwbTFsM2tvM3gzM3A1MmQ3In0.NHn1JSJlval4dTB6jXEowA'
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
				<Layer type="symbol" id="marker" layout={{ 'icon-image': "monument-15" }}>
					<Feature coordinates={buildingCoordinates} />
				</Layer>
			</Map>
		</div>
	);
}

export default MapElem;
