export const environment = {
    production: true,

    apiUrl: window["env"]["apiUrl"] || "default",
    apiUsuarios: window["env"]["apiUsuarios"] || "default",
    reportsUrl: window["env"]["reportsUrl"] || "default",
    debug: window["env"]["debug"] || false
    
};
