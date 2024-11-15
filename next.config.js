// next.config.js
module.exports = {
    reactStrictMode: true,  // Habilita el modo estricto de React (opcional pero recomendado)
    swcMinify: true,       // Habilita la minificación con SWC (más rápido y eficiente)
    output: 'standalone',  // Si necesitas empaquetar el proyecto como independiente
    webpack(config) {
      // Puedes agregar configuraciones adicionales si es necesario
      return config;
    },
  };
  