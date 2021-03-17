/* eslint-disable */
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export default {
  install: (app: any, options: any) => {
    const config = options.appInsightsConfig || {};
    config.instrumentationKey = config.instrumentationKey || options.id;

    if (options.appInsights) {
      app.config.globalProperties.appInsights = options.appInsights;
    } else {
      app.config.globalProperties.appInsights = new ApplicationInsights({ config });
      app.config.globalProperties.appInsights.loadAppInsights();
      app.config.globalProperties.appInsights.trackPageView();
      if (typeof (options.onAfterScriptLoaded) === 'function') {
        options.onAfterScriptLoaded(app.config.globalProperties.appInsights);
      }
    }
    app.provide('appInsights', options);
  },
};
