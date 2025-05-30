type TProps = {
  type: string,
  title: string,
  placeholder: string,
};

export function Input({ type, title, placeholder }: TProps) {
  const hash = Math.random().toFixed(10);
  return (
    <div className="mb-3">
      <label htmlFor={hash} className="form-label">{title}</label>
      <input type={type} className="form-control" id={hash} placeholder={placeholder}/>
    </div>
  );
}
