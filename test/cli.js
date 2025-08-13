"use strict";
/* eslint no-unused-vars: 0 */
import McpJenkins from '../lib/mcpJenkins.js';
import bag from 'bagofcli';
import cli from '../lib/cli.js';
import referee from '@sinonjs/referee';
import sinon from 'sinon';
const assert = referee.assert;

describe('cli - exec', function() {

  it('should contain commands with actions', function (done) {
    const mockCommand = function (base, actions) {
      assert.isString(base);
      assert.isFunction(actions.commands.run.action);
      done();
    };
    sinon.stub(bag, 'command').value(mockCommand);
    cli.exec();
  });
});

// describe('cli - run', function() {

//   beforeEach(function () {
//     this.mockBag = sinon.mock(bag);
//   });

//   afterEach(function () {
//     this.mockBag.verify();
//     this.mockBag.restore();
//   });

//   it('should contain run command and delegate to MCP Jenkins run when exec is called', function (done) {
//     sinon.stub(bag, 'command').value(function (base, actions) {
//       actions.commands.run.action({
//         runIncrementType: 'minor',
//         postrunIncrementType: 'patch',
//         tagFormat: 'v{version}',
//         parent: {
//         }
//       });
//     });
//     sinon.stub(McpJenkins.prototype, 'run').value(function (runScheme, versionScheme, scmScheme, cb) {
//       assert.equals(typeof cb, 'function');
//       done();
//     });
//     cli.exec();
//   });
// });