import { useContext } from "react";
import { UserContext } from "../../User/UserContext";
import LoginForm from "../../UI/Forms/User/Login";
import { RegisterForm } from "../../UI/Forms/User/Register";

export function SignUpPage() {
  const userDetails = useContext(UserContext);

  return (
    <>
      {userDetails.action == null && <LoginForm />}
      {userDetails.action === "register" && <RegisterForm />}
    </>
  );
}
