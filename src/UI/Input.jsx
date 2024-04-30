export default function Input({ children, id, ...props }) {
  return (
    <div>
      <label className='w-[130px] inline-block' htmlFor={id}>
        {children}:
      </label>
      <input
        className='rounded-md p-1 w-[250px]'
        name={id}
        id={id}
        required
        {...props}
      />
    </div>
  );
}
