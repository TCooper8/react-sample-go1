const networkError = (error: any) => {
  if (error.statusCode === 504) {
    return "Uh oh! Unable to communicate with the server right now.";
  }
  return "Sorry! The server ran into an issue.";
}

export default (error: any) => {
  if (error.networkError) return networkError(error.networkError);
  return "Unknown Error";
}