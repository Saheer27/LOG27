export default function ErrorMsg({
  errors,
  name,
  message,
}: {
  errors?: { [key: string]: string };
  name: string;
  message?: string | null;
}) {
  return (
    <>
      {errors?.[name] && (
        <p className="text-red-500 text-sm mb-4 mt-1">{errors[name]}</p>
      )}
      {message && <p className="text-red-500 text-sm mb-4 mt-1">{message}</p>}
    </>
  );
}
