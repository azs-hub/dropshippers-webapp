'use strict';

angular.module('dropshippers')
  .controller('ProductController',
              ['$scope', '$auth', 'product', 'PropositionService', 'ProfileModel', 'NgTableParams', '$filter', '$mdToast', 'propositions', 'zoneList',
               function ($scope, $auth, product, PropositionService, ProfileModel, NgTableParams, $filter, $mdToast, propositions, zoneList) {

        $scope.product = product;
        var proposition = {
          product_reference: product.dropshippers_ref,
          quantity: 1,
          deliveryArea: 'all'
        };
        $scope.proposition = {};
        $scope.propositions = propositions;
        $scope.zones = zoneList.zones;
        // console.log('zones', _.values($scope.zones));
        
        // console.log('zones : ', $scope.zones);
        $scope.user = ProfileModel;
        ProfileModel.loadUser();

        console.log('propositions = ', propositions);
        console.log('user = ', $scope.user);
        $scope.propositions = {
          "created_at": "3/22/2016",
          "status": "accepted",
          "quantity": 62,
          "shopGuest": [
            {
              "name": "Edgetag",
              "id": 1
            }
          ],
          "shopHost": [
            {
              "name": "Skyndu",
              "id": 1
            }
          ],
          "partenariatRef": "9622e1ba-10d2-4622-9de4-66eff876a0b5",
          "isSendDirectly": true,
          "isWhiteMark": false,
          "deliveryArea": [
            {
              "id": 1,
              "name": "Ukraine"
            }
          ],
          "productDropshippersRef": "2365c87e-83db-4e67-9ca5-3d47c5df453d",
          "messages": [
            {
              "from": [
                {
                  "name": "Skyndu",
                  "id": 1
                }
              ],
              "created_at": "6/13/2016",
              "isSendDirectly": false,
              "isWhiteMark": false,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Indonesia"
                },
                {
                  "id": 2,
                  "name": "Russia"
                },
                {
                  "id": 3,
                  "name": "Poland"
                },
                {
                  "id": 4,
                  "name": "China"
                },
                {
                  "id": 5,
                  "name": "Russia"
                }
              ],
              "content": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
              "price": "175.94",
              "user": [
                {
                  "name": "Willie",
                  "id": 1
                }
              ],
              "propositionRef": "1aab5cba-cb27-42ff-8a15-1980f3af6ac4"
            },
            {
              "from": [
                {
                  "name": "Edgetag",
                  "id": 1
                }
              ],
              "created_at": "3/21/2016",
              "isSendDirectly": false,
              "isWhiteMark": true,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Cuba"
                }
              ],
              "content": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
              "price": "104.56",
              "user": [
                {
                  "name": "Albert",
                  "id": 1
                }
              ],
              "propositionRef": "f37279c6-96e6-4c0c-82e9-6f39cc67bf2d"
            },
            {
              "from": [
                {
                  "name": "Skyndu",
                  "id": 1
                }
              ],
              "created_at": "7/14/2016",
              "isSendDirectly": false,
              "isWhiteMark": false,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "China"
                },
                {
                  "id": 2,
                  "name": "Indonesia"
                },
                {
                  "id": 3,
                  "name": "Ukraine"
                },
                {
                  "id": 4,
                  "name": "China"
                },
                {
                  "id": 5,
                  "name": "Morocco"
                }
              ],
              "content": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
              "price": "127.15",
              "user": [
                {
                  "name": "Matthew",
                  "id": 1
                }
              ],
              "propositionRef": "ae50eae2-c3c7-460b-bfeb-3947e1ef2b5a"
            },
            {
              "from": [
                {
                  "name": "Edgetag",
                  "id": 1
                }
              ],
              "created_at": "11/30/2015",
              "isSendDirectly": true,
              "isWhiteMark": true,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Madagascar"
                },
                {
                  "id": 2,
                  "name": "Indonesia"
                },
                {
                  "id": 3,
                  "name": "China"
                },
                {
                  "id": 4,
                  "name": "Portugal"
                }
              ],
              "content": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
              "price": "77.97",
              "user": [
                {
                  "name": "Pamela",
                  "id": 1
                }
              ],
              "propositionRef": "0f8dcf51-72aa-4fb9-b972-7ef55ccbf746"
            },
            {
              "from": [
                {
                  "name": "Skyndu",
                  "id": 1
                }
              ],
              "created_at": "12/31/2015",
              "isSendDirectly": true,
              "isWhiteMark": false,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Sweden"
                },
                {
                  "id": 2,
                  "name": "Philippines"
                },
                {
                  "id": 3,
                  "name": "Azerbaijan"
                }
              ],
              "content": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
              "price": "180.88",
              "user": [
                {
                  "name": "Doris",
                  "id": 1
                }
              ],
              "propositionRef": "ecbcb452-5281-48cb-a1ef-53fec6792ad5"
            },
            {
              "from": [
                {
                  "name": "Edgetag",
                  "id": 1
                }
              ],
              "created_at": "8/11/2016",
              "isSendDirectly": false,
              "isWhiteMark": false,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Yemen"
                },
                {
                  "id": 2,
                  "name": "Finland"
                }
              ],
              "content": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
              "price": "62.11",
              "user": [
                {
                  "name": "Julia",
                  "id": 1
                }
              ],
              "propositionRef": "0c24069c-4fe3-4f3c-b259-7e1ea3911464"
            },
            {
              "from": [
                {
                  "name": "Skyndu",
                  "id": 1
                }
              ],
              "created_at": "12/8/2015",
              "isSendDirectly": true,
              "isWhiteMark": true,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Pakistan"
                },
                {
                  "id": 2,
                  "name": "Ukraine"
                }
              ],
              "content": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
              "price": "94.19",
              "user": [
                {
                  "name": "Charles",
                  "id": 1
                }
              ],
              "propositionRef": "8151800c-92b8-487b-bf64-2566166a7cb5"
            },
            {
              "from": [
                {
                  "name": "Edgetag",
                  "id": 1
                }
              ],
              "created_at": "2/10/2016",
              "isSendDirectly": true,
              "isWhiteMark": false,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Egypt"
                },
                {
                  "id": 2,
                  "name": "Mongolia"
                },
                {
                  "id": 3,
                  "name": "Bolivia"
                }
              ],
              "content": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
              "price": "106.12",
              "user": [
                {
                  "name": "Wayne",
                  "id": 1
                }
              ],
              "propositionRef": "5afa4bf4-6146-4c55-9e1c-4e3fbef1b4de"
            },
            {
              "from": [
                {
                  "name": "Skyndu",
                  "id": 1
                }
              ],
              "created_at": "9/17/2016",
              "isSendDirectly": false,
              "isWhiteMark": false,
              "deliveryArea": [
                {
                  "id": 1,
                  "name": "Sweden"
                },
                {
                  "id": 2,
                  "name": "Japan"
                },
                {
                  "id": 3,
                  "name": "Indonesia"
                }
              ],
              "content": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
              "price": "47.98",
              "user": [
                {
                  "name": "Joyce",
                  "id": 1
                }
              ],
              "propositionRef": "0de1fc88-1b0e-489f-a7c0-1ca54066ded9"
            }
          ]
        };

        $scope.lastProposition = _.sortBy($scope.propositions.messages, ['created_at'])[$scope.propositions.messages.length-1];
        

        $scope.accept_props = function (id) {
          var data = [{ "op": "replace", "path" : "/status", "value" : "accepted"}];
          PropositionService.active(id, data).then(function(res) {
            //if (res.status == 200)

          });
        };

        var resetProp = function() {
          $scope.proposition = {};
        }

        $scope.props = function () {
            angular.extend(proposition, $scope.proposition);
            PropositionService.addProposition(proposition).then(function(res) {
              var props = {
                from: [{
                  name: $scope.user.username,
                  id: $scope.user.username
                }]
              };
             // "from": [
             //    {
             //      "name": "Skyndu",
             //      "id": 1
             //    }
             //  ],
             //  "created_at": "6/13/2016",
             //  "isSendDirectly": false,
             //  "isWhiteMark": false,
             //  "deliveryArea": [
             //    {
             //      "id": 1,
             //      "name": "Indonesia"
             //    },
             //    {
             //      "id": 2,
             //      "name": "Russia"
             //    },
             //    {
             //      "id": 3,
             //      "name": "Poland"
             //    },
             //    {
             //      "id": 4,
             //      "name": "China"
             //    },
             //    {
             //      "id": 5,
             //      "name": "Russia"
             //    }
             //  ],
             //  "content": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
             //  "price": "175.94",
             //  "user": [
             //    {
             //      "name": "Willie",
             //      "id": 1
             //    }
             //  ],
             //  "propositionRef": "1aab5cba-cb27-42ff-8a15-1980f3af6ac4" 
            if (res.status == 200) {
              $scope.propositions.messages.push(proposition);
              $scope.proposition = {};
              resetProp();
                $scope.tableParams.reload();
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Proposition bien envoyé')
                );
            } else {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Erreur')
                    .hideDelay(3000)
                );
            }

          });
        };

        $scope.tableParams = new NgTableParams({
          count: 30,
          sorting: {created_at: "asc"}
        }, {
          counts: [],
          total: 0,
          getData: function (params) {

            var filteredData = params.filter() ?
                      $filter('filter')($scope.propositions.messages,  params.filter()) :
                      $scope.propositions.messages;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    filteredData;
            params.total(orderedData.length);
            return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

            // return PropositionService.getProposition(product.dropshippers_ref).then(function(res) {

            //   if (res.status != 200)
            //     return null;
            //   else if (res.data.propositions.length > 0) {
            //     var filteredData = params.filter() ?
            //           $filter('filter')(res.data.propositions,  params.filter()) :
            //           res.data.propositions;
            //     var orderedData = params.sorting() ?
            //         $filter('orderBy')(filteredData, params.orderBy()) :
            //         filteredData;
            //     params.total(orderedData.length);
            //     return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            //   }
            // });
          },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
        });

      }
    ]
  );
