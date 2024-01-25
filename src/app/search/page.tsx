'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const search = useSearchParams()
  const searchQuery = search ? search.get("q") : null
  const encodedSearchQuery = encodeURI(searchQuery || "")
  console.log(encodedSearchQuery);
  const fetchData = async () => {
    try {
      await axios(`/api/search?q=${searchQuery}`, {
        method: "GET"
      }).then((res) => {
        console.log(res);

      }).catch((err) => {
        console.log(err);

      })
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchData()
  }, [searchQuery])
  return (
    <div>page</div>
  )
}

export default page