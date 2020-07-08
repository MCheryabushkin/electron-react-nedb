/* eslint-disable no-underscore-dangle */
import React from 'react';
import databaseModel from '../model/databaseModel';
// eslint-disable-next-line import/no-unresolved
import './user.css';

class UsersList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			userStore: [],
		};
	}

	componentDidMount () {
		this.getAllUsers();
	}

	getAllUsers = () => {
		databaseModel.getAllValues((userStore) => {
			this.setState({ userStore });
		});
	}

	createUsersList = () => {
		const { userStore } = this.state;

		if (userStore) {
			return userStore.map((element) => (
				<li key={element._id}>
					<div className="userItem">
						<h4>{ element.Name }</h4>
						<button id={element._id} type="button" onClick={() => this.removeUser(element._id)}>Удалить</button>
					</div>
				</li>
			));
		}
		return (<div />);
	}

	saveUser = (data) => {
		data.preventDefault();
		const name = document.getElementById('userName');
		const age = document.getElementById('userAge');

		databaseModel.insert({ Name: name.value, Age: age.value }, () => {
			name.value = '';
			age.value = '';
			return null;
		});

		this.getAllUsers();
	}

	removeUser = (id) => {
		databaseModel.remove('_id', id, () => console.log('Success'));
		this.getAllUsers();
	}

	render () {
		return (
			<div>
				<ul>
					{ this.createUsersList() }
				</ul>
				<form>
					<label htmlFor="userName">
						<input id="userName" type="text" />
					</label>
					<label htmlFor="userAge">
						<input id="userAge" type="number" />
					</label>
					<button type="submit" onClick={this.saveUser}>Добавить</button>
				</form>
			</div>
		);
	}
}

export default UsersList;
