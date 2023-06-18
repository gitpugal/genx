import { useState } from 'react';
import './App.css';
import background from './images/back.jpg';
import { Configuration, OpenAIApi } from "openai";
import { ThreeDots, TailSpin } from 'react-loader-spinner'


function App() {
  const [imageurl, setImageUrl] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  function changeHandler(e) {
    e.preventDefault();
    setUserPrompt(e.target.value);
  }

  function clearResponse() {
    setImageUrl("");
    setIsProcessing(false);
    setUserPrompt("");
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (userPrompt != "") {
      try {
        setIsProcessing(true);
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_OPEN_API_API,
          organization: "org-vhT3jOlV7cI1jkVgBa6Pi0wv",
        });
        const openai = new OpenAIApi(configuration);
        await openai.createImage({
          prompt: userPrompt.trim(),
          n: 2,
          size: '512x512',
        }).then((value) => {
          setImageUrl(value.data.data[0].url);
          setIsProcessing(false);
          setUserPrompt("");
        })
      } catch (e) {
        clearResponse();
        alert(e);
      }

    } else {
      alert("Please enter a valit prompt...")
    }
  }
  return (
    <div className="App overflow-x-hidden bg-[url('./images/back.jpg')] 
   flex flex-col bg-blue-300  w-screen items-center  h-fit lg:h-screen bg-cover ">
      <div className='flex items-center px-10 lg:px-0  flex-col lg:flex-row gap-20 w-screen'>
        <div className='flex-1 px-10 h-full items-center w-screen flex flex-col'>
          <h1 className='text-7xl mt-28 text-left font-extrabold space text-purple-600'>
            GenX <span className='block font-medium text-white text-6xl'>Images<span className='text-7xl text-purple-500'>.</span></span>
          </h1>
          <div className='px-10'>
            <form >
              <input type="text" value={userPrompt} onChange={changeHandler} placeholder='tell a scenario to generate an image...'
                className='mt-10 border-none py-5 px-3 w-[80%] md:w-full relative left-10 md:left-0 lg:w-full focus:outline-1
           outline-purple-600  shadow-xl
           rounded-xl bg-opacity-50 bg-white'/>
              <div className='flex flex-row gap-5 items-center justify-center'>
                <button onClick={submitHandler} disabled={isProcessing} className='block flex-1 w-44 lg:w-52 text-center h-12 justify-center flex-col items-center text-white px-5 bg-purple-600 py-3 mt-8 font-bold mx-auto rounded-xl'>{
                  isProcessing ? <ThreeDots
                    height="30"
                    width="40"
                    radius="3"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    className="w-fit mx-auto"

                  /> : "Generate Image"
                }</button>
                <button onClick={clearResponse} className='block flex-1 w-36 lg:w-52  text-center h-12 justify-center flex-col items-center text-purple-500 px-5 bg-orange-50 py-3 mt-8 font-bold mx-auto rounded-xl'>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 flex flex-col items-center text-center  sm:block'>
          <h1 className='drop-shadow-lg text-4xl px-4 rounded-xl shadow-2xl text-white mx-auto mt-10 font-extrabold pb-5 w-fit'>Your
            <span className='text-purple-500'> Image</span> Response
            <span className='text-6xl text-purple-500'>.</span></h1>
          <div className='h-96 w-[80%] overflow-hidden m-10 justify-center flex flex-col items-center
        border-dashed dash border-4 rounded-2xl border-p border-white '>
            {
              isProcessing ? <TailSpin color='purple' /> : imageurl ?
                <img src={imageurl} className='object-contain' /> :
                <h1 className='my-auto text-white'>
                  <span className='font-semibold text-purple-500'>Image</span> goes here...
                </h1>
            }
          </div>
        </div>
      </div>
      <p className='relative bottom-1'>
        Made with 💜 by - <span className='font-bold text-xl text-purple-500 font-mono'><a href="https://www.linkedin.com/in/pugalarasan-m-91a82b205/">Pugalarasan</a></span> .
      </p>
    </div>
  );
}

export default App;
