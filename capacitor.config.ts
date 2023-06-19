import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'LoginApplication',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile","email"],
      serviceClientId: "844536903342-djir7841qj4rdekhpbmlatscevkoiqiq.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
