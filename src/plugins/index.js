import Notifications from '@kyvg/vue3-notification';
import { loadFonts } from './webfontloader';
import errorHandler from './errorHandler';
import vuetify from './vuetify';
import router from './router';
import rules from './rules';
import moment from 'moment';
import store from './store';

import './../styles/custom.scss';

export function registerPlugins(app) {
    loadFonts();
    app
        .use(Notifications)
        .use(store)
        .use(vuetify)
        .use(router)
        .use({
            install: (app) => {
                app.provide('errorHandler', errorHandler);
                app.provide('rules', rules);

                app.config.globalProperties.$formatDate = (timestamp, format = 'lll') => {
                    if (timestamp === undefined || timestamp === null) return '';
                    return moment(timestamp).format(format);
                };
            },
        });
}
