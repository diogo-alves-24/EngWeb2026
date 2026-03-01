const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.examesListPage = (elist, d) => renderPug('index', { list: elist, date: d });
exports.examePage = (emd, d) => renderPug('emdView', {e : emd, date : d})
exports.treinoFormPage = (d) => renderPug('form', { date: d });
exports.treinoFormEditPage = (t, d) => renderPug('form', { treino: t, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });
exports.statsPage = (stats, d) => renderPug('stats', {stats : stats, data : d});
