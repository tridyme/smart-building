import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const MapElem = () => {
	const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoidHJpYXp1ciIsImEiOiJjazRmZmVmcjAwbTFsM2tvM3gzM3A1MmQ3In0.NHn1JSJlval4dTB6jXEowA'
  });
  return (
		<Map
			style="mapbox://styles/triazur/ck4oeg8gg0v4q1co4pyhsqjlr"
			containerStyle={{
				height: '100vh',
				width: '100vw'
			}}
		>
			<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
				<Feature coordinates={[48.858547, 2.294503]} />
			</Layer>
		</Map>
	);
}

export default MapElem;
