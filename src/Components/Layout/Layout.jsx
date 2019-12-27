import React from 'react';
import {
	Container,
	Row,
	Col
} from 'reactstrap';
import NavBar from '../NavBar';
import WebAppBar from '../WebAppBar';
import './Layout.css';

const Layout = ({
	children
}) => (
	<Col md={12}>
		<Row>
			<WebAppBar />
		</Row>
		<Row>
			<Container fluid={false} className="views-container">
				{children}
			</Container>
		</Row>
	</Col>
);

export default Layout;
