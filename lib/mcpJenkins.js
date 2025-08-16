"use strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * McpJenkins is a Model Context Protocol (MCP) server that provides Jenkins management capabilities.
 */
class McpJenkins {

  /**
   * Initialise Nestor, MCP server, and load all MCP tools.
   */
  constructor(name, version, opts) {

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

    opts.tools.forEach(tool => {
      this.server.tool(
        tool.info.name,
        tool.info.description,
        tool.info.parameters,
        tool.handler(opts.nestor, _actionCb)
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
