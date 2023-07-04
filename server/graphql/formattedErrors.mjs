const formattedErrors = (formattedError, error) => {
  // Return a different error message
  // console.log(error);

  const patternE11000 = /E11000.*?(\{.*?\})/;
  const patternCastError =
    /^Cast to ObjectId failed for value "([^"]+)" \(type [^)]+\) at path "([^"]+)" for model "([^"]+)"/;

  const dupKeyMatch = error.message.match(patternE11000);
  const casteErrorMatch = error.message.match(patternCastError);

  if (dupKeyMatch) {
    const keyObject = dupKeyMatch[1];
    const keyObjParse = JSON.parse(
      keyObject.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":'),
    );
    const keyName = Object.keys(keyObjParse);

    return {
      ...formattedError,
      message: `Theres already a record with that ${keyName[0]}`,
      extensions: {
        code: 'DUPLICATE_KEY',
        stacktrace: formattedError.extensions?.stacktrace,
      },
    };
  }

  if (casteErrorMatch) {
    const objectIdValue = casteErrorMatch[1]; // ObjectId value
    const path = casteErrorMatch[2]; // Path value
    const modelName = casteErrorMatch[3]; // Model name

    return {
      ...formattedError,
      message: `We cannot find the ${path}: ${objectIdValue} for that ${modelName}`,
      extensions: {
        code: 'CASTE_ERROR',
        stacktrace: formattedError.extensions?.stacktrace,
      },
    };
  }
  // if (
  //   formattedError.extensions.code ===
  //   ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
  // ) {
  //   return {
  //     ...formattedError,
  //     message: "Your query doesn't match the schema. Try double-checking it!",
  //   };
  // }

  // Otherwise return the formatted error. This error can also
  // be manipulated in other ways, as long as it's returned.
  return formattedError;
};

export default formattedErrors;
