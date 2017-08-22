const $ = document.querySelector.bind(document);
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
    const store = await d2.dataStore.get('academy2017');

    function setRating() {
        const rating = $('#rating').value;
        
        store.set('session', { name: 'App development', rating });
    }

    async function getRating() {        
        const rating = await store.get('session');
        const meta = await store.getMetaData('session');

        $('#output').innerHTML = `
            The value:
            <pre>${JSON.stringify(rating, undefined, 4)}</pre>
            The meta:
            <pre>${JSON.stringify(meta, undefined, 4)}</pre>
        `;
    }

    $('#setRating').addEventListener('click', setRating);
    $('#getRating').addEventListener('click', getRating);
})();