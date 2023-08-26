export const common_functions = {
  responseTranslator: async (data: any) => {
    if (data.sender == "earth" && data.receiver == "mars") {
      return {
        "Response from Earth": data.message,
        "Nokia Translation": data.result,
      };
    } else {
      return {
        "Response from Mars": data.message,
        "Nokia Translation": data.result,
      };
    }
  },
};
