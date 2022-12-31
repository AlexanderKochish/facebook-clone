import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../firebase";

const SignIn = () => {
  const router = useRouter();

  const userSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-center bg-slate-400">
      <form onSubmit={userSignIn} className="flex flex-col p-2 bg-white">
        <h2>Sign In</h2>
        <input type="email" placeholder="Your Email" />
        <input type="password" placeholder="Your Password" />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
