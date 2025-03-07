"use client"
import {SearchManufacturer} from "./"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Router } from "next/router"

 
const SearchBar = () => {
  const SearchButton = ({otherClasses}:{otherClasses:string}) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src='/magnifying-glass.svg'
        width={40}
        height={40}
        alt='search'
        className="object-contain"
      />
      </button>
  )
  const router = useRouter()
const [manufacturer, setManufacturer] = useState("")
const [model, setModel] = useState("")
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(manufacturer ===''&&model ===''){
      return alert("Please enter a manufacturer or model")
    }
    updateSearchParams(model.toLowerCase(),manufacturer.toLowerCase())
    }
const updateSearchParams =(model:string,manufacturer:string)=>{
  const searchParams = new URLSearchParams(window.location.search)
  if(manufacturer){
    searchParams.set('manufacturer',manufacturer)
  }else{
    searchParams.delete('manufacturer')
  }
  if(model){
    searchParams.set('model',model)
  }else{
    searchParams.delete('model')
  } 
  const newPathName=`${window.location.pathname}?${searchParams.toString()}` 
  // window.location.href = `/search?${searchParams.toString()}`
router.push(newPathName)
}
  return (
    <form action="" className='searchbar' onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
            <SearchButton otherClasses="sm:hidden" />

        </div>
        <div className="searchbar__item">
          <Image
          src="/model-icon.png"
          width={25}
          height={25}
          alt="model"
          className="absolute w-[20x] h-[20px] ml-4"
          /> 
          <input
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Tiguan"
            className="searchbar__input"/>
<SearchButton otherClasses="sm:hidden"/>
        </div>
<SearchButton otherClasses="max-sm:hidden"/>

    </form>
  )
}

export default SearchBar