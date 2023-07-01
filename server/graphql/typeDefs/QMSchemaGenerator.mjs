class QMSchemaGenerator {
  constructor(name, variables, response) {
    this.name = name;
    this.validateVariables(variables);
    this.variables = variables;
    this.validateResponse(response);
    this.response = response;
  }

  validateVariables(variables) {
    if (variables) {
      const variableKeys = Object.keys(variables);
      // trunk-ignore(eslint/no-restricted-syntax)
      for (const key of variableKeys) {
        const variable = variables[key];
        if (!variable.type || !variable.description) {
          throw new Error(
            'Invalid variables format. Each variable must have "type" and "description".',
          );
        }
      }
    }
  }

  validateResponse(response) {
    if (response) {
      if (!response.type || !response.description) {
        throw new Error(
          'Invalid response format. Response must have "type" and "description".',
        );
      }
    }
  }

  getVariableString() {
    if (!this.variables) {
      return '';
    }

    const variableKeys = Object.keys(this.variables);
    const variableString = variableKeys
      .map((key) => `${key}: ${this.variables[key].type}`)
      .join(', ');

    return `(${variableString})`;
  }

  getSchemaString() {
    const variableString = this.getVariableString();
    return `${this.name}${variableString}:${this.response.type}`;
  }
}

export default QMSchemaGenerator;
