const { init, getInstance, config } = window.d2;

const initConfig = {
    baseUrl: `http://localhost:8080/dhis/api`,
    headers: {
        Authorization: `Basic ${btoa('admin:district')}`,
    },
    schemas: ['userRole', 'userGroup', 'organisationUnit'],
};

init(initConfig);

(async function () {
    const d2 = await getInstance();

    const output = document.querySelector('#output');
    const systemSettings = await d2.system.settings.all();

    output.innerHTML = `
        <h3>Version</h3>
        <pre>${JSON.stringify(d2.system.version, undefined, 4)}</pre>

        <h3>System info</h3>
        <pre>${JSON.stringify(d2.system.systemInfo, undefined, 4)}</pre>

        <h3>System settings</h3>
        <pre>${JSON.stringify(systemSettings, undefined, 4)}</pre>
    `;
})();
