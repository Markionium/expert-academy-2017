const { init, getInstance, config } = window.d2;

const initConfig = {
    baseUrl: `http://localhost:8080/dhis/api`,
    headers: {
        Authorization: `Basic ${btoa('admin:district')}`,
    },
    schemas: ['userRole', 'userGroup', 'organisationUnit'],
};

// Remote strings need to be pre-registered
config.i18n.strings.add('yes');
config.i18n.strings.add('data_element');

init(initConfig);

(async function () {
    const d2 = await getInstance();
    
    console.log(d2.i18n.getTranslation('yes'));
    console.log(d2.i18n.getTranslation('data_element'));

    d2.currentUser.userSettings.set('keyUiLocale', 'en');
})();
