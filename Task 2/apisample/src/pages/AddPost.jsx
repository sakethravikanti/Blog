import React from "react";
import ApiPoster from "../components/ApiPoster";
import Navbar from '../components/Navbar'
 
const App = () => {
  return (
   <>
   <Navbar/>
   <h1>Add A New Post</h1>
   <ApiPoster/>
   </>
  );
};

export default App;
