const { permit } = require('service-engine'); // exists within container scope

const systemPermissions = permit().crud();

const resourcePermissions = {
    // 'public_some_table': permit().create().read().update().delete(),
    // 'some_schema_some_view_name': permit().read(),
    // 'some_schema_some_mat_view': permit().read(),

    // sqlite does not have schemas
    // 'some_table': permit().create().read().update().delete(),
    // 'some_view_name': permit().read(),
}

module.exports = { systemPermissions, resourcePermissions };