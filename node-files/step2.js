const fs = require('fs');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`File contents: ${data}`);
	});
}

async function webCat(url) {
	try {
		const res = await axios.get(url);
		console.log(res.data);
	} catch (err) {
		console.log(`Error: Request failed: ${err}`);
	}
}

const path = process.argv[2];
let re = /^(www)|(https)/;
if (path.match(re)) {
	webCat(path);
} else {
	cat(path);
}
