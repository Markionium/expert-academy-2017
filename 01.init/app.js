const { init } = window.d2;

const initConfig = {
    baseUrl: `http://localhost:8080/dhis/api`,
    headers: {
        Authorization: `Basic ${btoa('admin:district')}`,
    },
    schemas: [],
};

init(initConfig)
    .then(d2 => console.log(d2));