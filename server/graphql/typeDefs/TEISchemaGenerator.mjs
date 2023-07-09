class SchemaGenerator {
  constructor(modelName, modelType, schema) {
    this.modelName = modelName;
    this.modelType = modelType;
    this.validateSchema(schema);
    this.schema = schema;
  }

  validateSchema(schema) {
    const keys = Object.keys(schema);
    // trunk-ignore(eslint/no-restricted-syntax)
    for (const key of keys) {
      const field = schema[key];
      if (!field.type || !field.description) {
        throw new Error(
          `Invalid schema format for field '${key}'. Each field must have 'type' and 'description'.`,
        );
      }
    }
  }

  getSchemaString() {
    if (this.modelType === 'enum') {
      const schemaKeys = Object.keys(this.schema);
      return `${this.modelType} ${this.modelName} {${schemaKeys.join(' ')}}`;
    }

    const schemaString = Object.entries(this.schema)
      .map(([key, value]) => {
        return `${key}: ${value.type}`;
      })
      .join(' ');

    return `${this.modelType} ${this.modelName} {${schemaString}} `;
  }
}

export default SchemaGenerator;
