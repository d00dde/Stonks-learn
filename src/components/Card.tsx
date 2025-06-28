type TProps = {
  text: string;
};

export function Card({ text }: TProps) {
  return (
    <div className="card h1 text-center text-capitalize p-4 w-100 bg-info-subtle border-0 shadow-sm">
      {text}
    </div>
  );
}
