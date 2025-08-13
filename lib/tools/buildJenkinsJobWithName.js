import { z } from "zod";

const info = {
  name: 'build_jenkins_job_with_name',
  description: 'Start a build job with specified job name on Jenkins',
  parameters: { name: z.string() },
};

/**
 * Handler for building Jenkins job with specified name.
 * 
 * @param {Object} nestor: Nestor instance to interact with Jenkins
 * @param {Function} actionCb: callback function to handle Nestor action result
 * @returns {Function} handler function that takes parameters and returns a Promise
 */
function handler(nestor, actionCb) {

  return async ({ name }) => {
    function _contentText(result) {
      return `Job ${name} was triggered successfully`;
    }
    return new Promise((resolve, reject) => {
      const cb = actionCb(resolve, reject, _contentText);
      nestor.buildJob(name, {}, cb);
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
