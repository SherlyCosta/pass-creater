import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength]=useState(8)
  const [numAllow, setNumAllow]=useState(false)
  const [char, setChars]=useState(false)
  const [password, setPassword]=useState("") //here we generate the password so its empty string

  //useRef hook- const ref = useRef(initialValue). useRef is a React Hook that lets you reference a value that’s not needed for rendering.
  const passwordRef= useRef(null) //initial value is null

  //passwordGenerator method
  const passwordGenerator=useCallback(()=>{
    let pass="" //empty password
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"  

    if(numAllow) str+="0123456789"  //if numAllow is true then add numbers to the string
    if(char) str+="!@#$%^&*()_+"  //if char is true then add special characters to the string

    for(let i=1; i<=length; i++){  //loop runs till the length of the password
      //create password
      let char= Math.floor(Math.random()* str.length +1)
      pass+= str.charAt(char)  //charAt() method returns the character at the specified index in a string. value is added
    }
    //read the value of the password
    setPassword(pass)

  }, [length, numAllow, char, setPassword])
    //const cachedFn = useCallback(fn, dependencies). 1st parameter passed is the funtcion and 2nd parameter is the dependencies passed in the form of an array. refer this website--  https://react.dev/reference/react/useCallback

    const copyPassToClipboard= useCallback(()=>{
      passwordRef.current?.select(); //selects the text in the input field. ?. is optional chaining operator which checks if passwordRef.current is not null or undefined before calling the select() method.
      passwordRef.current?.setSelectionRange(0,999); //sets the selection range of the input field from index 0 to 22. say if you want to copy only first 10 characters then you can set it to 10.

      window.navigator.clipboard.writeText(password) //writes the text to clipboard
    },[password]) //function to copy the password to clipboard. password is the dependency where password is depended when clicked on the copy button

    useEffect(()=>{
      passwordGenerator()
    },[length, numAllow, char, passwordGenerator]) //call the passwordGenerator function whenever any of the dependencies change
    // useEffect(setup, dependencies?). useEffect takes 2 parameters, 1st is the function and 2nd is the dependencies in the form of an array

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'> 
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
          type="text"
          value={password} 
          className='outline-none w-full py-1 px-3'
          placeholder='Your Password'
          readOnly
          ref={passwordRef}  //useRef hook is used to access the DOM element directly
        />

        <button onClick={copyPassToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        {/* div container for range and length */}
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} //need to pass an event e, and that event can call the setLegth property
          />
          <label>Length ({length})</label>
        </div>

        {/* div container for number checkbox */}
        <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={numAllow}
        id="numInput" 
        onChange={()=>{
          setNumAllow((prev)=>!prev) //prev is the previous value of numAllow, if its true it becomes false and vice versa. when calling the setNumAllow function, we added a callback function where the previous value is passed as an argument and can change that value
        }} //fired a call back function when the value changes
        />
        <label>Numbers</label>
        </div>

        {/* div container for characters checkbox */}
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={char}
          id="characterInput" 
          onChange={()=>{
            setChars((prev)=>!prev) //prev is the previous value of char, if its true it becomes false and vice versa
          }}
          />
          <label>Characters</label>
        </div>

      </div>
    </div>
  )
}

export default App
