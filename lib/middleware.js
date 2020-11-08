const resourceSearchMiddleware = {
    // public_gis_osm_places_free_1: item => {
  
    //   console.log('---------')
    //   console.log('resourceSearchMiddleware.public_gis_osm_places_free_1')
    //   console.log(item)
    //   console.log('---------')
    //   return item;
    // },  
    // public_account_: item => ({...item, email: 'clark.kent@metro.net'}),
    cms_providers: item => {
  
      console.log('---------')
      console.log('resourceSearchMiddleware.cms_providers')
      console.log(item)
      console.log('---------')
      return {...item, "address_state.in": 'NJ,WV'};
    },
    // 'public_i001_city_state_entity_provider_n:cms_providers': item => {
  
    //   console.log('---------')
    //   console.log('resourceSearchMiddleware.public_i001_city_state_entity_provider_n:cms_providers')
    //   console.log(item)
    //   console.log('---------')
    //   return {...item};
    // },
}
  
module.exports = resourceSearchMiddleware;