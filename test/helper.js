export const COMPONENT_NAME = 'HypernovaExampleReact.js';

export function makeJob(props) {
  return {
    name: COMPONENT_NAME,
    data: props,
  };
}

export function requireFresh(module, opts = {}) {
  const { alsoClear } = opts;
  [module, ...(alsoClear || [])].forEach((path) => delete require.cache[require.resolve(path)]);
  return require(module); // eslint-disable-line global-require, import/no-dynamic-require
}
