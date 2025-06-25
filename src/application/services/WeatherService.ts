import { AlertFeature, ForecastPeriod } from "../../domain/models/Weather.js";
import { NWSApiService } from "../../infrastructure/services/NWSApiService.js";

export class WeatherService {
  constructor(private apiService: NWSApiService) {}

  // Format alert data
  formatAlert(feature: AlertFeature): string {
    const props = feature.properties;
    return [
      `Event: ${props.event || "Unknown"}`,
      `Area: ${props.areaDesc || "Unknown"}`,
      `Severity: ${props.severity || "Unknown"}`,
      `Status: ${props.status || "Unknown"}`,
      `Headline: ${props.headline || "No headline"}`,
      "---",
    ].join("\n");
  }

  // Format forecast period
  formatForecastPeriod(period: ForecastPeriod): string {
    return [
      `${period.name || "Unknown"}:`,
      `Temperature: ${period.temperature || "Unknown"}°${
        period.temperatureUnit || "F"
      }`,
      `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
      `${period.shortForecast || "No forecast available"}`,
      "---",
    ].join("\n");
  }

  async getAlertsForState(stateCode: string): Promise<string> {
    const alertsData = await this.apiService.getAlerts(stateCode.toUpperCase());

    if (!alertsData) {
      return "Failed to retrieve alerts data";
    }

    const features = alertsData.features || [];
    if (features.length === 0) {
      return `No active alerts for ${stateCode.toUpperCase()}`;
    }

    const formattedAlerts = features.map((feature) =>
      this.formatAlert(feature)
    );
    return `Active alerts for ${stateCode.toUpperCase()}:\n\n${formattedAlerts.join(
      "\n"
    )}`;
  }

  async getForecastForLocation(
    latitude: number,
    longitude: number
  ): Promise<string> {
    // Get grid point data
    const pointsData = await this.apiService.getPoints(latitude, longitude);

    if (!pointsData) {
      return `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`;
    }

    const forecastUrl = pointsData.properties?.forecast;
    if (!forecastUrl) {
      return "Failed to get forecast URL from grid point data";
    }

    // Get forecast data
    const forecastData = await this.apiService.getForecast(forecastUrl);
    if (!forecastData) {
      return "Failed to retrieve forecast data";
    }

    const periods = forecastData.properties?.periods || [];
    if (periods.length === 0) {
      return "No forecast periods available";
    }

    // Format forecast periods
    const formattedForecast = periods.map((period) =>
      this.formatForecastPeriod(period)
    );
    return `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join(
      "\n"
    )}`;
  }
}
