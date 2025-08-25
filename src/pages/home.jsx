export default function Home() {
  const me = JSON.parse(localStorage.getItem("me") || "null");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="p-6">
      {me ? (
        <>
          <h1 className="text-2xl font-bold">Welcome, {me.name}</h1>
          <p>Role: {me.role}</p>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 mt-3 rounded">Logout</button>
        </>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
}
