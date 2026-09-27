const fs = require('fs');

const path = 'app/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace useEffect with useFocusEffect
content = content.replace(
  'import React, { useEffect, useState } from "react";',
  'import React, { useEffect, useState, useCallback } from "react";'
);
content = content.replace(
  'import { router } from "expo-router";',
  'import { router, useFocusEffect } from "expo-router";\nimport AsyncStorage from "@react-native-async-storage/async-storage";'
);

const loadWeatherStart = '    const loadWeather = async () => {';
const loadWeatherEnd = '        });\n      } catch (error) {';
const newLoadWeather = `    const loadWeather = async () => {
      try {
        let latitude = 35.7412; // Default to Relizane, Algeria
        let longitude = 0.5559;
        
        try {
          const savedLoc = await AsyncStorage.getItem("selectedLocation");
          if (savedLoc) {
            const loc = JSON.parse(savedLoc);
            if (loc.latitude && loc.longitude) {
              latitude = loc.latitude;
              longitude = loc.longitude;
            }
          }
        } catch (e) {
          console.error("Failed to load location from storage", e);
        }

        const [reverseGeocode, weatherResponse] = await Promise.all([
          Location.reverseGeocodeAsync({ latitude, longitude }),
          fetch(
            \`https://api.open-meteo.com/v1/forecast?latitude=\${latitude}&longitude=\${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1\`,
          ),
        ]);

        if (!weatherResponse.ok) {
          throw new Error(\`Weather request failed (\${weatherResponse.status})\`);
        }

        const payload: {
          current?: {
            temperature_2m?: number;
            relative_humidity_2m?: number;
            wind_speed_10m?: number;
            weather_code?: number;
          };
          daily?: {
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
          };
        } = await weatherResponse.json();

        const current = payload.current;
        const parsed = weatherFromCode(current?.weather_code);

        if (!mounted) return;

        setWeather({
          temperature:
            typeof current?.temperature_2m === "number"
              ? \`\${Math.round(current.temperature_2m)}°C\`
              : "--°C",
          condition: parsed.condition,
          humidity:
            typeof current?.relative_humidity_2m === "number"
              ? \`\${Math.round(current.relative_humidity_2m)}%\`
              : "--",
          wind:
            typeof current?.wind_speed_10m === "number"
              ? \`\${Math.round(current.wind_speed_10m)} km/h\`
              : "--",
          todayRange:
            typeof payload.daily?.temperature_2m_min?.[0] === "number" &&
            typeof payload.daily?.temperature_2m_max?.[0] === "number"
              ? \`\${Math.round(payload.daily.temperature_2m_min[0])}° / \${Math.round(payload.daily.temperature_2m_max[0])}°\`
              : "-- / --",
          location: formatLocationLabel(reverseGeocode, latitude, longitude),
          icon: parsed.icon,
          iconColor: parsed.iconColor,
        });`;

const p1 = content.substring(0, content.indexOf(loadWeatherStart));
const p2 = content.substring(content.indexOf(loadWeatherEnd) + '        });'.length);

content = p1 + newLoadWeather + p2;

content = content.replace(
  '  useEffect(() => {\n    let mounted = true;',
  '  useFocusEffect(\n    useCallback(() => {\n      let mounted = true;'
);

content = content.replace(
  '    loadWeather();\n\n    return () => {\n      mounted = false;\n    };\n  }, []);',
  '      loadWeather();\n\n      return () => {\n        mounted = false;\n      };\n    }, [])\n  );'
);

fs.writeFileSync(path, content, 'utf8');
