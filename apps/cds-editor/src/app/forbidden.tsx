function Forbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-[family-name:var(--font-montserrat)]">
      <h2 className="text-2xl font-bold">Forbidden</h2>
      <p className="text-sm text-gray-500">You are not authorized to access this resource.</p>
    </div>
  );
}

export default Forbidden;
