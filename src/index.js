const values = {};
const tags = {};

export const set = (key, value, ...tags) => {
	values[key] = value;
	if(tags) tags.forEach(tag => addToTag(tag, key));
}

export const get = key => values[key];

export const all = () => Object.assign({}, values);

export const unset = key => {
	delete values[key];
	Object.values(tags)
	.forEach(tagMap => delete tagMap[key]);
}

export const clear = () => {
	Object.keys(values).forEach(key => delete values[key]);
	Object.keys(tags).forEach(tag => delete tags[tag]);
}

export const byTag = (tag) => {
	const tagMap = tags[tag];

	if(!tagMap) return {};

	return Object.keys(tagMap)
	.reduce((results, key) => { 
		results[key] = values[key]; 
		return results;
	}, {});
}

export const getTags = () => Object.keys(tags);

export default get;

function addToTag(tag, key){
	if(!tags[tag]) tags[tag] = {};
	tags[tag][key] = true;
}