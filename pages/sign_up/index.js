const SignUp = () => {
  return (
    <div className="flex w-full h-full items-center justify-center bg-slate-400">
      <form className="flex flex-col p-2 bg-white">
        <h2>Sign Up</h2>
        <input type='text' placeholder='Your Name'/>
        <input type='email' placeholder='Your Email'/>
        <input type='password' placeholder='Your Password'/>
        <input type='file' id="file" className="hidden"/>
        <label htmlFor="file">Upload your image</label>
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp