const SignIn = () => {
  return (
    <div className="flex w-full h-full items-center justify-center bg-slate-400">
      <form className="flex flex-col p-2 bg-white">
        <h2>Sign In</h2>
        <input type='email' placeholder='Your Email'/>
        <input type='password' placeholder='Your Password'/>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn