import chai from 'chai'
const should = chai.should();

import { default as modmap, get, all, set} from 'src/';

describe('modmap', function(){
	const myModule = {
		awesome: true,
		status: "spectacular"
	}

	describe('set', function(){
		it('should not throw an error', function(){
			set("Foos", myModule);
		});
	});

	describe('get', function(){
		it('should equal the default export', function(){
			get.should.equal(modmap);
		});

		it('should return a value for a valid key', function(){
			should.exist(get('Foos'));
		});

		it('should return null for an invalid key', function(){
			should.not.exist(get('FoosTwo'));
		});

		it('should return the correct value for a key', function(){
			get('Foos').should.equal(myModule);
		});
	});

	describe('all', function(){
		it('should return an object of key/values', function(){
			const allValues = all();
			should.exist(allValues);
			allValues.should.be.a('object');
			
			should.exist(allValues.Foos);
			allValues.Foos.should.equal(myModule);
		});
	});
});