/*eslint-disable */

'use strict';

module.exports = {

  getAddresses (callback) {
    setTimeout(function () {
      callback(
        {"addresses":[{"id":"direccion0","alias":"Casa de María","street":"C/ Fermín Caballero","streetNumber":76,"apartmentNumber":"2A","zipCode":"01008","city":"Mondariz","province":"Baracaldo","country":"España","isCompany":false},{"id":"direccion1","alias":"Trabajo","street":"C/ Calatrava","streetNumber":50,"apartmentNumber":"2A","zipCode":"01001","city":"Bilbao","province":"Mondariz","country":"España","isCompany":false},{"id":"direccion2","alias":"Trabajo","street":"C/ Fermín Caballero","streetNumber":57,"apartmentNumber":"2A","zipCode":"01008","city":"Bilbao","province":"Baracaldo","country":"España","isCompany":true},{"id":"direccion3","alias":"Casa de María","street":"C/ Calatrava","streetNumber":4,"apartmentNumber":"3 Izq","zipCode":"01001","city":"Baracaldo","province":"Baracaldo","country":"España","isCompany":false}]}
      );
    }, 300);
  }


};
