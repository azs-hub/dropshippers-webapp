angular.module('navbar', [
  'navbar.model',
  'navbar.controller',
  'pascalprecht.translate',
]).config(function ($translateProvider, $translatePartialLoaderProvider) {
		$translatePartialLoaderProvider.addPart('navbar');	
	});