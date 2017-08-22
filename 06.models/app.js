const $ = document.querySelector.bind(document);
const { init, getInstance, config } = window.d2;

const initConfig = {
    baseUrl: `http://localhost:8080/dhis/api`,
    headers: {
        Authorization: `Basic ${btoa('admin:district')}`,
    },
};

init(initConfig);

function showOnScreen(modelCollection) {
    const output = document.querySelector('#output');

    const names = modelCollection
        .toArray()
        .map(model => `<div>${model.displayName}</div>`)
        .reduce((acc, row) => acc + row);

    output.innerHTML = `
        <div>
            ${names}
        </div>
    `
}

(async function () {
    const d2 = await getInstance();

    let modelCollection = await d2.models.dataElement
        .list();

    
    const firstModel = [...modelCollection.values()][0];
    firstModel.name = firstModel.name + '22';
    firstModel.save()
        .then(result => console.log('Saved', result));

    showOnScreen(modelCollection);

    $('#next').addEventListener('click', async () => {
        modelCollection = await modelCollection.pager.getNextPage();
        showOnScreen(modelCollection);
    });

    $('#prev').addEventListener('click', async () => {
        console.log('Clicked!');
        modelCollection = await modelCollection.pager.getPreviousPage();
        showOnScreen(modelCollection);
    });
})();
