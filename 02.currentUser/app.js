const { init, getInstance } = window.d2;

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
    
    const [organisationUnit] = await d2.currentUser.getOrganisationUnits();
    const userGroups = await d2.currentUser.getUserGroups();
    const userRoles = await d2.currentUser.getUserRoles();

    document.querySelector('#output').innerHTML = `
        <h1>Hello, ${d2.currentUser.displayName} from ${organisationUnit[1].displayName}</h1>

        <h2>UserGroups</h2>
        <ul>
            ${userGroups.toArray().reduce((html, userGroup) => html + `<li>${userGroup.displayName}</li>`, '')}
        </ul>

        <h2>UserRoles</h2>
        <ul>
            ${userRoles.toArray().reduce((html, userGroup) => html + `<li>${userGroup.displayName}</li>`, '')}
        </ul>
    `;
})();
