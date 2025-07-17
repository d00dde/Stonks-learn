import type { User } from "firebase/auth";

type UserData = {
  status: "statusA" | "statusB";
  learnedAt: "learnedAtA" | "learnedAtB";
}

const usersFields = {
  mPqhharZPsXb3TwZfkptWi1ksYg1: {
    status: "statusA",
    learnedAt: "learnedAtA",
  },
  "5K7vLANn34ePMWmCAeQdOtfstIJ2": {
    status: "statusB",
    learnedAt: "learnedAtB",
  },
} as const;

export function getUserData(user: User | null): UserData  {
  if (!user) {
    return usersFields["mPqhharZPsXb3TwZfkptWi1ksYg1"];
  }
  return usersFields[user.uid as keyof typeof usersFields] ?? usersFields["mPqhharZPsXb3TwZfkptWi1ksYg1"];
}

