import { assert } from 'chai';
import express from 'express';
import { requireFresh } from './helper';

describe('Hypernova server', () => {
  const getComponent = () => {};

  function hypernova(...args) {
    return requireFresh(
      '../src/server',
      { alsoClear: ['../src/utils/logger', '../src/worker', '../src/server'] },
    )(...args);
  }

  function close(instance) {
    if (!instance) return;

    if (!instance.devServer) {
      throw new Error("No devServer to close. If you're trying to test non-devserver stuff, you'll have to add a way to kill it and put that here.");
    }

    if (instance.devServer.server) {
      instance.devServer.close();
    } else {
      instance.devServer.callback = () => instance.devServer.close(); // eslint-disable-line no-param-reassign
    }
  }

  it('blows up if hypernova does not get getComponent', () => {
    let instance;
    assert.throws(() => { instance = hypernova(); }, TypeError);
    close(instance);
  });

  it('blows up if hypernova gets `createApplication` that isnt a function', () => {
    let instance;
    assert.throws(() => {
      instance = hypernova({
        devMode: true,
        getComponent,
        createApplication: {},
      });
    }, TypeError);
    close(instance);
  });

  it('blows up if hypernova gets `createApplication` that doesnt return an express app', () => {
    let instance;
    assert.throws(() => {
      instance = hypernova({
        devMode: true,
        getComponent,
        createApplication: () => {},
      });
    }, TypeError);
    close(instance);
  });

  it('starts up the hypernova server without blowing up', () => {
    let instance;
    assert.isOk(instance = hypernova({ devMode: true, getComponent }));
    close(instance);
  });

  it('starts up the hypernova server and an express instance without blowing up', () => {
    const APP_TITLE = 'my custom express instance';

    const createApplication = () => {
      const app = express();
      app.locals.name = APP_TITLE;

      return app;
    };

    const hypernovaServer = hypernova({
      devMode: true,
      getComponent,
      createApplication,
      port: 8090,
    });

    assert.equal(APP_TITLE, hypernovaServer.locals.name);

    close(hypernovaServer);
  });
});
