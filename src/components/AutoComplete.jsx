import React from 'react'

const AutoComplete = ({options,handleOptionClick}) => {
  return (
    <ul className='dropdown'>
      {options.map((option)=>(
        <li
          key={option}
          className='option'
          onClick={()=>handleOptionClick(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  )
}

export default AutoComplete