import { useEffect } from 'react'

const useOutSideClick = (referens,handler,close = true) => {
  useEffect(()=>{
    if(!close) return;

    const handleClick = (e) => {
        if(!referens.current) return;
        if(!referens.current.contains(e.target)){
            handler()
        }
    }
    document.addEventListener('click', handleClick)

    return ()=> {
        document.removeEventListener('click', handleClick)
    }

  },[referens,handler,close])
}

export default useOutSideClick