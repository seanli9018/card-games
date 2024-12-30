const activityFetcher = () =>
  fetch("https://activities-api.com/api/random").then((r) => r.json());

export default activityFetcher;
