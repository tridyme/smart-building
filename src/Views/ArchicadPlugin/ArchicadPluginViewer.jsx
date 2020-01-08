import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Button,
	CardDeck,
	Table
} from 'reactstrap';

const ArchicadPluginViewer = ({
	// match
	ACAPI
}) => {
	// const {
	// 	ACAPI
	// } = match.params;

	useEffect(() => {
		UpdateSelectedElements();
		AddElementToSelection();
  }, []);

	function UpdateSelectedElements () {
		ACAPI.GetSelectedElements ().then (function (elemInfos) {
			var selectionTable = document.getElementById ('selection');
			while (selectionTable.firstChild) {
				selectionTable.removeChild (selectionTable.firstChild);
			}

			var index, len;
			for (index = 0, len = elemInfos.length; index < len; ++index) {
				var tr = document.createElement ('tr');
				selectionTable.appendChild (tr);

				var guid = document.createElement ('td');
				guid.innerHTML = elemInfos[index][0];
				tr.appendChild (guid);

				var type = document.createElement ('td');
				type.innerHTML = elemInfos[index][1];
				tr.appendChild (type);

				var elemID = document.createElement ('td');
				elemID.innerHTML = elemInfos[index][2];
				tr.appendChild (elemID);

				var removeButton = document.createElement ('button');
				removeButton.innerHTML = '-';
				removeButton.guid = guid.innerHTML;
				removeButton.onclick = function (e) {
					ACAPI.RemoveElementFromSelection (e.currentTarget.guid).then (function (res) {
					});
				};
				tr.appendChild (removeButton);
			}
			if (len == 0) {
				var tr = document.createElement ('tr');
				selectionTable.appendChild (tr);

				var dummy = document.createElement ('td');
				dummy.innerHTML = 'Empty Selection';
				dummy.setAttribute ('colspan', '3');
				tr.appendChild (dummy);
			}
		});
	}

	function AddElementToSelection() {
		var elemGuidToAddInput = document.getElementById ('elemGuidToAdd');

		ACAPI.AddElementToSelection (elemGuidToAddInput.value).then (function (res) {
			elemGuidToAddInput.value = '';
		});
	}


	return (
		<div>
			<Breadcrumb>
      <BreadcrumbItem><Link to="/dashboard">Dashboard</Link></BreadcrumbItem>
      <BreadcrumbItem>Archicad Plugin</BreadcrumbItem>
    </Breadcrumb>
			<Row>
				<Col lg={12}>
					<Table>
						<thead>
							<tr>
								<th>GUID</th>
								<th>Type</th>
								<th>Element ID</th>
							</tr>
						</thead>
						<tbody id="selection">
							<tr>
								<td colSpan="3">Empty Selection</td>
							</tr>
						</tbody>
					</Table>
					<br />
					<form id="frm1" action="/action_page.php">
						<input type="text" id="elemGuidToAdd" size="40" />
						<input type="button" onclick="AddElementToSelection ()" value="+" />
					</form>
					<br />					
				</Col>
			</Row>
			<br />
		</div>
	);
};

export default ArchicadPluginViewer;

