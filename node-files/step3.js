const fs = require('fs');
const axios = require('axios');

const doAsync = require('doasync');

async function cat(path) {
	return fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(data);
	});
}

async function webCat(url) {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (err) {
		console.log(`Error: Request failed: ${err}`);
	}
}

const pathArg = process.argv[2];
let re = /^(www)|(https)/;

if (pathArg === '--out') {
	outputToFile(process.argv[3], process.argv[4]);
} else if (pathArg.match(re)) {
	webCat(pathArg);
} else {
	cat(pathArg);
}

async function outputToFile(file, content) {
	if (content.match(re)) {
		content = webCat(content);
	} else {
		content = await doAsync(fs)
			.readFile(content)
			.then(data => data);
	}
	fs.writeFile(file, content, 'utf8', function (err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('File updated successfully');
	});
}
