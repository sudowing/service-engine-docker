const fs = require("fs");
const path = require("path");
const pipeline = require("stream").pipeline;

const { genNextMigrationName } = require("service-engine");

const mkdir = (dir) => {
	// making directory without exception if exists
	try {
		fs.mkdirSync(dir, 0755);
	} catch(e) {
		if(e.code != "EEXIST") {
			throw e;
		}
	}
};

const copyDir = (src, dest) => {
	mkdir(dest);
	const files = fs.readdirSync(src);
	for(let i = 0; i < files.length; i++) {
		const current = fs.lstatSync(path.join(src, files[i]));
		if(current.isDirectory()) {
			copyDir(path.join(src, files[i]), path.join(dest, files[i]));
		} else if(current.isSymbolicLink()) {
			const symlink = fs.readlinkSync(path.join(src, files[i]));
			fs.symlinkSync(symlink, path.join(dest, files[i]));
		} else {
			copy(path.join(src, files[i]), path.join(dest, files[i]));
		}
	}
};

const copy = (src, dest) => {
	const oldFile = fs.createReadStream(src);
	const newFile = fs.createWriteStream(dest);
    pipeline(oldFile, newFile, () => {})
};
const sqlTemplateDirectory = path.join(__dirname, 'sql_template');

const migratrionDirectory = path.join(__dirname, 'migrations');
const migratrionScripts = fs.readdirSync(migratrionDirectory)
    .filter(name => name.endsWith('.js'));

const id = (++migratrionScripts.length).toString().padStart(4, '0');
const args = process.argv.slice(2);

const migration_name = genNextMigrationName({
    date: new Date(),
    id,
    args,
});

copy(`${__dirname}/knex.migration_by_sql_dir.template`, `${migratrionDirectory}/${migration_name}.js`);
copyDir(sqlTemplateDirectory, `${migratrionDirectory}/sql/${id}`);
