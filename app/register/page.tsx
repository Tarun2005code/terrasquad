export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-[#2F5D50] text-white py-3 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}