export const createForeignKeyConstraintName = (tableName: string, referenceTableName: string, referenceColumnName: string) => {
  return [tableName, referenceTableName, referenceColumnName, 'FK'].join('_').toUpperCase();
};

export const createIndexConstraintName = (tableName: string, ...columnNames: string[]) => {
  return [tableName, columnNames.join('&'), 'IDX'].join('_').toUpperCase();
};
