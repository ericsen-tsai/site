import LoginButton from "@/components/login-button";

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoginButton provider="google" />
      <LoginButton provider="github" />
    </div>
  );
}

export default Login;
