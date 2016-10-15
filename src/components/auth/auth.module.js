'use strict';

angular.module('auth', [
  'auth.service',
  'auth.controller',
  'pascalprecht.translate',
]).config(function ($translateProvider, $translatePartialLoaderProvider) {
		$translatePartialLoaderProvider.addPart('auth');	
	});