"use strict";
// import buildJobTool from './tools/buildJob.js';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import Nestor from "nestor";

import buildJenkinsJobWithNameTool from './tools/buildJenkinsJobWithName.js';
import checkJenkinsVersionTool from './tools/checkJenkinsVersion.js';

const tools = [
  buildJenkinsJobWithNameTool,
  checkJenkinsVersionTool
];

/**
 * McpJenkins is a Model Context Protocol (MCP) server that provides Jenkins management capabilities.
 */
class McpJenkins {

  /**
   * Initialise Nestor, MCP server, and load all MCP tools.
   */
  constructor(name, version, opts) {

    const nestor = new Nestor(opts.url);

    function _actionCb(resolve, reject, contentText) {
      return (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            content: [{ type: 'text', text: contentText(result)}]
          });
        }
      };
    };

    this.server = new McpServer({
      name: name,
      version: version,
    });

    tools.forEach(tool => {
      this.server.tool(
        tool.info.name,
        tool.info.description,
        tool.info.parameters,
        tool.handler(nestor, _actionCb)
      );
    });
  }

  /**
   * Run the MCP server.
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }

}

export {
  McpJenkins as default
};
