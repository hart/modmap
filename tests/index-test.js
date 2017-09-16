import chai from 'chai'
const should = chai.should();

import { default as modmap, get, all, set} from 'src/';

describe('modules.js', function(){
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
		it('should return a value for a valid key', function(){
			should.exist(get('Foos'));
		});

		it('should return null for an invalid key', function(){
			should.not.exist(get('FoosTwo'));
		});

		it('should return the correct object for a key', function(){
			get('Foos').should.equal(myModule);
		});
	});

	describe('all', function(){
		it('should return an object of objects', function(){
			should.exist(all());
			all().should.be.a('object');
			
			should.exist(all().Foos);
			all().Foos.should.be.a('object');
			all().Foos.should.equal(myModule);
		});
	});
});