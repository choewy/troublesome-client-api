export class DatabaseConstraint {
  constructor(private readonly tableName: string) {}

  public primaryKey(fieldName: string) {
    return `${this.tableName}_${fieldName}_PK`.toUpperCase();
  }

  public foreignKey(fieldName: string) {
    return `${this.tableName}_${fieldName}_FK`.toUpperCase();
  }

  public index(...fieldNames: string[]) {
    return `${this.tableName}_${fieldNames.join('_')}_IDX`.toUpperCase();
  }
}
