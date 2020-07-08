const db = window.require('electron').remote.getGlobal('database');

const databaseModel = {};
/**
 * Inserts information into the database
 */
databaseModel.insert = (info, callback) => {
	db.insert(info, (err, doc) => {
		if (err) {
			console.log(`ERROR ${err}`);
			return err;
		}
		return callback(doc);
	});
};

/**
 * Finds information from databse
 */
databaseModel.find = (query, param, callback) => {
	db.findOne({ [query]: param }, (err, doc) => callback(doc));
};

/**
 * Finds information from databse
 */
databaseModel.findMultiple = (query, param, callback) => {
	db.findOne({ [query]: param }, { multi: true }, (_err, doc) => callback(doc));
};

/**
 * Gets all the accounts that are stored in the database
 */
databaseModel.getAllValues = (callback) => {
	db.find({}, (err, result) => callback(result));
};

/**
 * Gets all the accounts that are stored in the database
 */
databaseModel.findValues = (typeKey, typeValue, callback) => {
	db.find({ [typeKey]: typeValue }, (err, result) => callback(result));
};
/**
 * Removes a single value
 */
databaseModel.remove = (value, param, callback) => {
	db.remove({ [value]: param }, { multi: true }, (err, numDeleted) => {
		if (err) {
			console.log(`Error with deleting! ${err}`);
		}
		return callback(numDeleted);
	});
};

/**
 * Updates a single value
 */
databaseModel.update = (value, param, setKeyValue, newVal, callback) => {
	db.update({ [value]: param }, { $set: { [setKeyValue]: newVal } }, (err) => callback(err));
};

databaseModel.getAll = () => {
	let allUsers = [];
	db.find({}, (err, docs) => {
		if (!err) {
			allUsers = docs;
		}
	});
	return allUsers;
};

export default databaseModel;
