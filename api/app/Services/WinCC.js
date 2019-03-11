'use strict';

const Redis = use('Redis');
const Database = use('Database');

class WinCC {
  async getHistoricos(variables, desde, hasta, select, where) {
    try {
      select =
        select ||
        'convert(varchar, Timestamp, 120) AS Timestamp, Archive_ID, RealValue, Bloque_ID, Tipo, Filtrado';
      where = where || 'Quality = 128';

      const historicos = await Database.connection('mssql').raw(
        'EXEC SP_GetHistoricos @variables = ?, @select = ?, @where = ?, @desde = ?, @hasta = ?',
        [variables, select, where, desde, hasta]
      );

      // console.log(
      //   `EXEC SP_GetHistoricos @variables = ${variables}, @select = ${select}, @where = ${where}, @desde = ${desde}, @hasta = ${hasta}`
      // );
      return historicos;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = WinCC;
