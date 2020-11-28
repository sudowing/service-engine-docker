const fs = require('fs');
const gatherContent = require('service-engine').gatherContent;

exports.gatherContentByID = (dir, id) => gatherContent([dir, 'sql', id].join('/'));

exports.process_sql = (files) => (knex) => {
    if(files.length) {
        const tnx = knex.schema;
        files.forEach(file => {
            tnx.raw(fs.readFileSync(file, 'utf-8'))
        });
        return tnx;
    }
}
