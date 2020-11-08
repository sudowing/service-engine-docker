const { permit } = require("service-engine");

// set system. set schema. set resource. lowest defined will be respected (as will be combined with ancestors).
const systemPermissions = permit().none();
const resourcePermissions = {
  'schema.r': permit().read(),
  'schema.table.u': permit().update(),
  'schema.view.d': permit().delete(),
  'public.gis_osm_places_free_1': permit().create().read(),
  'schema.matView.cru': permit().create().read().update(),
  'schema.matView.c-r-u-d': permit().create().read().update().delete(),
  'schema.matView.crud': permit().crud(),
  'schema.matView.none': permit().none(),
  'cms.providers': permit().crud(),

  // sqlite3 has no schemas
  'table': permit().create().read().update().delete(),
  'view': permit().create().read().update().delete(),

}

module.exports = { systemPermissions, resourcePermissions }