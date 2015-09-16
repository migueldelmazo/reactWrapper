'use strict';

export default [
  {
    name: 'index',
    path: '',
    subRoute: [
      {
        name: 'addresses',
        path: 'addresses',
        subRoute: [
          {
            name: 'addressAdd',
            path: 'add',
            subRoute: [
              {
                name: 'addressAddAll',
                path: 'addAll'
              }
            ]
          },
          {
            name: 'addressUser',
            path: ':user',
            subRoute: [
              {
                name: 'addressId',
                path: ':id'
              }
            ]
          }
        ]
      },
      {
        name: 'payments',
        path: 'payments'
      }
    ]
  }
];
