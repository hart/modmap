const modules = {};

export const set = (key, module) => modules[key] = module;
export const get = key => modules[key];
export const all = () => Object.assign({}, modules);

export default get;