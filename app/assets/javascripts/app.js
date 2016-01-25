angular
  .module('32ResultsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
  //  'ngTouch',
    'ngMaterial'
    //'templates'
  ])
  .run(function($log) {
    $log.debug('App Run');
  })

  .factory('contact', ['$http', function($http) {
    var o = {
      contact: []
    };
    o.getAll = function() {
      return $http.get('/contacts.json').success(function(data) {
        angular.copy(data, o.contact);
      });
    };
    o.create = function(post) {
      return $http.post('/contacts.json', post).success(function(data) {
        o.contact.push(data);
      });
    };
    return o;
  }])

  .controller('MainCtrl', function($scope, $mdDialog, contact, $http) {
    var vm = this;

    var action = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Secondary Action')
        .content('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
      );
    };

    vm.submit = function() {
      if(!vm.email || vm.email === '') {return sweetAlert('An e-mail address is required'); }
      sweetAlert('Thank You for signing up.', 'You will now receive future product updates.', 'success');
      contact.create({
        last_name: vm.lastName,
        first_name: vm.firstName,
        email: vm.email
      });
      vm.lastName = '';
      vm.firstName = '';
      vm.email = '';
    };
    vm.cancel = function() {
      vm.lastName = '';
      vm.firstName = '';
      vm.email = '';
    };
  })

  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')

    .primaryPalette('blue',

        {
          'default': '500', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        }
      )
      .accentPalette('orange');
  })

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'spcVm'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');
});
