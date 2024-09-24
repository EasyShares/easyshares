export const generateCompetitionUrl = async (name: string) => {
  const urlName = name.toLocaleLowerCase().replace(/\s+/g, "-");
  const currentYear = new Date().getFullYear();
  const url = `/${urlName}-${currentYear}`;
  return url;
};
