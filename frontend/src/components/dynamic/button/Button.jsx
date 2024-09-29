import React from 'react'

const Button = ({btnValue,onClickFunc,className,style}) => {
  return (
    <div>
      <button style={style} onClick={onClickFunc} className={className}>{btnValue}</button>
    </div>
  )
}

export default Button