import chai from 'chai'
const should = chai.should();

import { default as modmap, get, all, set, unset, clear, byTag, getTags } from 'src/';

describe('modmap', function(){
	const NonExistentKey = 'InvalidFoos';

	const FoosKey = 'Foos';
	const FoosValue = {
		awesome: true,
		status: 'spectacular'
	}

	const FooBarKey = 'FooBar';
	const FooBarValue = {
		awesome: false,
		status: 'not as spectacular'
	}
	const FooBarTag1 = 'FooBarTag123';
	const FooBarTag2 = 77;
	const FooBarTag3 = 'FooBars';
	const NonExistentTag = "Cars"; 

	describe('set()', function(){
		it('should not throw an error', function(){
			should.not.throw(() => set(FoosKey, FoosValue));
		});

		it('should accept tags without an error', function(){
			should.not.throw(() => set(FooBarKey, FooBarValue, FooBarTag1, FooBarTag2, FooBarTag3));
		});
	});

	describe('get()', function(){
		it('should equal the default export', function(){
			get.should.equal(modmap);
		});

		it('should return a value for an existing key', function(){
			should.exist(get(FoosKey));
		});

		it('should return null for a non-existent key', function(){
			should.not.exist(get(NonExistentKey));
		});

		it('should return the correct value for a key', function(){
			get(FoosKey).should.equal(FoosValue);
		});
	});

	describe('all()', function(){
		it('should return an object of key/values', function(){
			const allValues = all();
			should.exist(allValues);
			allValues.should.be.a('object');
		});

		it('should return all key/values', function(){
			const allValues = all();
			should.exist(allValues[FoosKey]);
			allValues[FoosKey].should.equal(FoosValue);
			allValues[FooBarKey].should.equal(FooBarValue);
		})
	});

	describe('getTags()', function(){
		it('should not throw an error', function(){
			should.not.throw(() => getTags());
		});

		it('should return an object', function(){
			getTags().should.be.an('array');
		});
	})

	describe('byTag()', function(){
		set(FoosKey, FoosValue);
		set(FooBarKey, FooBarValue, FooBarTag1, FooBarTag2, FooBarTag3)

		it('should not throw an error with a non-existent tag', function(){
			should.not.throw(() => byTag(NonExistentTag));
		});

		it('should not throw an error with an existing tag', function(){
			should.not.throw(() => byTag(FooBarTag1));
		});

		it('should return an empty object for an non-existent tag', function(){
			const values = byTag(NonExistentTag);
			should.exist(values);
			values.should.be.a('object');
			values.should.be.empty;
		});

		it('should return a object of key/values for an existing tag', function(){
			const values = byTag(FooBarTag1);
			should.exist(values);
			values.should.be.a('object');
			values.should.not.be.empty;
		});

		it('should return correct key/values for an existing tag', function(){
			const values = byTag(FooBarTag1);
			const value = values[FooBarKey];
			should.exist(value);
			value.should.equal(FooBarValue);
		});

		it('should return a given key/value for each tag the key/value was set with', function(){
			const results = 
				[FooBarTag1, FooBarTag2, FooBarTag3]
				.map(tag => byTag(tag))
				.map(result => result[FooBarKey]);

			results[0].should.equal(FooBarValue);
			results[1].should.equal(FooBarValue);
			results[2].should.equal(FooBarValue);
		});
	});

	describe('unset()', function(){
		it('should not throw an error with a non-existent key', function(){
			should.not.throw(() => unset(NonExistentKey));
		});

		it('should not throw an error with an existing key', function(){
			set(FoosKey, FoosValue);
			should.not.throw(() => unset(FoosKey));
		});

		it('should remove the keyed value from the store', function(){
			set(FoosKey, FoosValue);
			should.exist(get(FoosKey));
			unset(FoosKey);
			should.not.exist(get(FoosKey));
		});
	});

	describe('clear()', function(){
		//make sure the map isn't empty
		set(FoosKey, FoosValue);
		set(FooBarKey, FooBarValue, FooBarTag1, FooBarTag2, FooBarTag3)

		it('should not throw an error', function(){
			should.not.throw(() => clear());
		});

		it('should remove all values from the map', function(){
			all().should.be.empty;
		});

		it('should not throw an error while empty', function(){
			should.not.throw(() => clear());
		});
	});
});