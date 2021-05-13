const fs = require('fs');

function cat(path) {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`File contents: ${data}`);
	});
}

cat(process.argv[2]);
