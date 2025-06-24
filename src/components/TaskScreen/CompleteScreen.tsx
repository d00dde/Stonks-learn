type TProps = {
  score: number;
  maxScore: number;
};

type TGrade = "A+" | "A" | "B" | "C" | "D" | "E" | "F";

const completePhrases: Record<TGrade, string> = {
  "A+": "Ебать, ты умный",
  A: "Отличный результат!",
  B: "Хороший результат!",
  C: "Неплохо, но можно лучше.",
  D: "Че-то как-то не очень, попробуй ещё раз.",
  E: "Совсем слабо, попробуй ещё раз, но трезвым!",
  F: "Ты точно учишь английский?",
}

function calcGrade(result: number): TGrade {
  if (result === 100) return "A+";
  if (result >= 90) return "A";
  if (result >= 80) return "B";
  if (result >= 70) return "C";
  if (result >= 60) return "D";
  if (result >= 50) return "E";
  return "F";
}

export function CompleteScreen({ score, maxScore }: TProps) {
  const grade = calcGrade((score / maxScore) * 100);
  return (
    <>
      <div className="display-1 text-center">{grade}</div>
      <div className="display-3 text-center">{completePhrases[grade]}</div>
    </>
  );
}
