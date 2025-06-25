import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { WeatherService } from "../../application/services/WeatherService.js";

export class WeatherToolsController {
  constructor(
    private server: McpServer,
    private weatherService: WeatherService
  ) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetAlertsToolhandler();
    this.registerGetForecastToolHandler();
  }

  private registerGetAlertsToolhandler(): void {
    this.server.tool(
      "get-alerts",
      "Get weather alerts for a state",
      {
        state: z
          .string()
          .length(2)
          .describe("Two-letter state code (e.g. CA, NY)"),
      },
      async ({ state }) => {
        const alertsText = await this.weatherService.getAlertsForState(state);

        return {
          content: [
            {
              type: "text",
              text: alertsText,
            },
          ],
        };
      }
    );
  }

  private registerGetForecastToolHandler(): void {
    this.server.tool(
      "get-forecast",
      "Get weather forecast for a location",
      {
        latitude: z
          .number()
          .min(-90)
          .max(90)
          .describe("Latitude of the location"),
        longitude: z
          .number()
          .min(-180)
          .max(180)
          .describe("Longitude of the location"),
      },
      async ({ latitude, longitude }) => {
        const forecastText = await this.weatherService.getForecastForLocation(
          latitude,
          longitude
        );

        return {
          content: [
            {
              type: "text",
              text: forecastText,
            },
          ],
        };
      }
    );
  }
}
