const formattedErrors = (formattedError, error) => {
  // Return a different error message
  console.log(error);

  const pattern = /E11000.*?(\{.*?\})/;
  const dupKeyMatch = error.message.match(pattern);
  if (dupKeyMatch) {
    const keyObject = dupKeyMatch[1];
    const keyObjParse = JSON.parse(
      keyObject.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":'),
    );
    const keyName = Object.keys(keyObjParse);

    return {
      ...formattedError,
      message: `Theres already a record with that ${keyName[0]}`,
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
