define(["jquery", "chai", "sinon-chai", "q"], function($, chai, sinonChai, q) {
	var expect = chai.expect;
  var should = chai.should();
	describe("sinon fake server", function() {
		var server = sinon.fakeServer.create();
    server.respondWith("GET", "/some/article/comments.json",
                            [200, { "Content-Type": "application/json" },
                             '[{ "id": 12, "comment": "Hey there" }]']);
	  after(function() {
		  server.restore();
		});
		it("should successfully respond to requests made via promises!", function(done) {
			var ajaxSpy = sinon.spy($, "ajax");
			expect(ajaxSpy).to.be.ok;
			this.timeout(10000);
			expect(true).to.be.true;
			var dfd = q.defer();
			$.ajax("/some/article/comments.json", {
				success: function(data) {
					dfd.resolve(data);
				}
			});
			dfd.promise.then(function(data) {
				expect(data[0].id).to.equal(12);
				done();
			});
			q.delay(2000).then(function() {
				ajaxSpy.should.have.been.calledOnce;
				server.respond();
			});
		}); 
	});
});