import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

// सभी ऐड्स की मैपिंग (आपके दिए गए कोड्स के अनुसार)
const AD_CONFIGS = {
  'banner_160x300': {
    key: '6a2a20bae6f9b2da465952e04e83b8f5',
    format: 'iframe',
    height: 300,
    width: 160,
    isScriptTag: false,
  },
  'banner_728x90': {
    key: 'e37ebd8914702d4decba619be159fe81',
    format: 'iframe',
    height: 90,
    width: 728,
    isScriptTag: false,
  },
  'banner_320x50': {
    key: '84ad02dc1dcf68b53d7469a6d9ae1220',
    format: 'iframe',
    height: 50,
    width: 320,
    isScriptTag: false,
  },
  'banner_468x60': {
    key: '776ca31e87886fca5dcc5bc652537d17',
    format: 'iframe',
    height: 60,
    width: 468,
    isScriptTag: false,
  },
  'banner_300x250': {
    key: 'dabaeabe92d4fcbe62fc3ffc7593335c',
    format: 'iframe',
    height: 250,
    width: 300,
    isScriptTag: false,
  },
  'direct_script': {
    key: 'https://pl29332530.effectivecpmnetwork.com/6a/78/ba/6a78ba2ca8a241c5e4cda295fb083225.js',
    format: null,
    height: null,
    width: null,
    isScriptTag: true,
  }
};

export default function AdBanner({ placement }) {
  const config = AD_CONFIGS[placement];
  if (!config) return null;

  // HTML स्ट्रिंग जनरेट करें
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="monetag" content="108d8db24e0e226aa3ccf7171323173b">
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        <div id="ad-container"></div>
        ${config.isScriptTag 
          ? `<script src="${config.key}"></script>` 
          : `
            <script>
              atOptions = {
                'key' : '${config.key}',
                'format' : '${config.format}',
                'height' : ${config.height},
                'width' : ${config.width},
                'params' : {}
              };
            </script>
            <script src="https://www.highperformanceformat.com/${config.key}/invoke.js"></script>
          `
        }
      </body>
    </html>
  `;

  return (
    <View style={{ height: config.height || 60, width: config.width || '100%', alignSelf: 'center' }}>
      <WebView 
        source={{ html: htmlContent }} 
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}