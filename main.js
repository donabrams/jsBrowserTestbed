require(["jquery", "require"], function($, require) {
	require(['require', 'mocha'], function(require){
		mocha.setup('bdd');
		require(['test'], function(test) {
			mocha.run();
		});
	});
});