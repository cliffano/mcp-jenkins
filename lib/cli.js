"use strict";
import bag from 'bagofcli';
import fs from 'fs';
import McpJenkins from './mcpJenkins.js';
import p from 'path';

import Nestor from "nestor";

import buildJenkinsJobWithNameTool from './tools/buildJenkinsJobWithName.js';
import checkJenkinsVersionTool from './tools/checkJenkinsVersion.js';

const APP_DIR = process.cwd(),
  DIRNAME = p.dirname(import.meta.url).replace('file://', '');

function _run(args) {

  const pkgFile = p.join(DIRNAME, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgFile));

  const url = process.env.JENKINS_URL || 'http://localhost:8080';
  const opts = {
    nestor: new Nestor(url),
    tools: [
      buildJenkinsJobWithNameTool,
      checkJenkinsVersionTool
    ]
  };

  const mcpJenkins = new McpJenkins(pkg.name, pkg.version, opts);
  mcpJenkins.run();

}

/**
 * Execute MCP Jenkins.
 */
function exec() {

  const actions = {
    commands: {
      run : { action: _run }
    }
  };

  bag.command(DIRNAME, actions);
}

const exports = {
  exec: exec
};

export {
  exports as default
};