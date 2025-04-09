import { getDatabase, push, set,ref, onChildAdded } from 'firebase/database';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const provider = new GoogleAuthProvider();
const auth =getAuth();

const googleLogin=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setuser({name:result.user.displayName, email:result.user.email});
    console.log(token,user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}






  const [user, setuser] = useState("");
  const [chats, setchats] = useState([]);

  const [msg, setmsg] = useState("");


const db =getDatabase();
const chatListRef =ref(db,'chats');








const updateHeight=()=>{
  const el= document.getElementById('chat');
  if(el)
  {

    el.scrollTop=el.scrollHeight;
  }
}




useEffect(()=>{
onChildAdded(chatListRef, (data)=>{
  
  setchats(chats=>[...chats,data.val()])
  setTimeout(()=>{

    updateHeight()
  },1000);
});
},[])





  function sendChat() {


    const db = getDatabase();
    const chatListRef = ref(db, 'chats');
    const chatRef = push(chatListRef);
    set(chatRef, {
        user, message: msg
    });


    // const c = [...chats];
    // c.push({ name, message: msg });
    // setchats([]);
    setmsg("");
  }

  return (
    <>
      {user.email ? null : (
        <div>
          {/* <input
            type="text"
            placeholder="Enter name to start "
            // value={name}
            onBlur={(e)=>setname(e.target.value)}
            // onChange={(e) => setname(e.target.value)}
          /> */}



              <div className='front'>

          <button onClick={e=>{googleLogin()}}   className='sign_in'  >Google Sign IN</button>
              </div>


        </div>
      )}
    
{user.email?
    <div>
      <h3>User:{user.name}</h3>
      <div  id="chat" className="chat-container">
      
        {chats.map((c,i) => (
          <div key={i}   className={`container${c.user.email === user.email ? "me" : ""}`}>
            <p className="chatbox">
              <strong>{c.user.name}:</strong>
              <span>{c.message}</span>
            </p>
          </div>
        ))}
      </div>
        </div>
      :null}

      { user.email ? <div>

      <div className="btm">
        <input
          type="text"
          placeholder="Enter your text .."
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          // onBlur={(e)=>setmsg(e.target.value)}
        />
        <button onClick={sendChat}>Send</button>
      </div>
        </div>: null}

    </>
  );
}

export default App;
