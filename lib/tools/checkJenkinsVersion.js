import { z } from "zod";

const info = {
  name: 'check_jenkins_version',
  description: 'Check the version of the Jenkins server',
  parameters: {}
};

/**
 * Handler for checking Jenkins version.
 * @param {Object} nestor: Nestor instance to interact with Jenkins
 * @param {Function} actionCb: callback function to handle Nestor action result
 * @returns {Function} handler function that takes parameters and returns a Promise
 */
function handler(nestor, actionCb) {

  return async ({}) => {
    function _contentText(result) {
      return `Jenkins version is ${result}`;
    }
    return new Promise((resolve, reject) => {
      const cb = actionCb(resolve, reject, _contentText);
      nestor.version(cb);
    });
  };

}

const exports = {
  info: info,
  handler: handler
};

export {
  exports as default
};