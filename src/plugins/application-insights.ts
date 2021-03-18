/* eslint-disable */
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { App } from 'vue'
interface AppInsightsOptions {
  instrumentationKey: string;
  loggingLevelConsole: number;
  autoTrackPageVisitTime: boolean;
  enableAutoRouteTracking: boolean;
  accountId?: string;
}

const AI_INSTRUMENT_KEY = process.env.VUE_APP_AI_INSTRUMENT_KEY || '';

export default {
  install: (app: App, options?: AppInsightsOptions) => {
    const config: AppInsightsOptions = options || {} as AppInsightsOptions;
    config.instrumentationKey = config.instrumentationKey || AI_INSTRUMENT_KEY;
    if(window.navigator.onLine && !!config.instrumentationKey) {
      app.config.globalProperties.appInsights = new ApplicationInsights({ config });
      app.config.globalProperties.appInsights.loadAppInsights();
      app.config.globalProperties.appInsights.trackPageView();
    }
  },
};
