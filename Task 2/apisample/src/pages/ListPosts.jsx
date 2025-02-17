import React from 'react'
import ApiCaller from '../components/ApiCaller'
import Navbar from '../components/Navbar'

const ListPosts = () => {
  return (
    <>
    <Navbar/>
    <h1>List Of Created Posts</h1>
    <ApiCaller/>
    </>
  )
}

export default ListPosts