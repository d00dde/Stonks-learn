const usersData = {
  Saha: {
    words: "words-s",
    phrases: "phrases-s",
  },
  def: {
    words: "words",
    phrases: "phrases",
  }
};

export function getUserData(userName: string) {
  if(userName in usersData) {
    return usersData[userName as keyof typeof usersData];
  }
  return usersData.def;
}