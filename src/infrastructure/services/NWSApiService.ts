import {
  AlertsResponse,
  PointsResponse,
  ForecastResponse,
} from "../../domain/models/Weather.js";

export class NWSApiService {
  private readonly API_BASE = "https://api.weather.gov";
  private readonly USER_AGENT = "weather-app/1.0";

  // Helper function for making NWS API requests
  async makeRequest<T>(endpoint: string): Promise<T | null> {
    const url = `${this.API_BASE}${endpoint}`;
    const headers = {
      "User-Agent": this.USER_AGENT,
      Accept: "application/geo+json",
    };

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("Error making NWS request:", error);
      return null;
    }
  }

  async getAlerts(stateCode: string): Promise<AlertsResponse | null> {
    return this.makeRequest<AlertsResponse>(`/alerts?area=${stateCode}`);
  }

  async getPoints(
    latitude: number,
    longitude: number
  ): Promise<PointsResponse | null> {
    return this.makeRequest<PointsResponse>(
      `/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`
    );
  }

  async getForecast(forecastUrl: string): Promise<ForecastResponse | null> {
    // This endpoint requires the full URL, not just the path
    const headers = {
      "User-Agent": this.USER_AGENT,
      Accept: "application/geo+json",
    };

    try {
      const response = await fetch(forecastUrl, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as ForecastResponse;
    } catch (error) {
      console.error("Error making NWS request:", error);
      return null;
    }
  }
}
