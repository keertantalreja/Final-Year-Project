import React from 'react'

const Input = ({ type, onChangeFunc, className, name, placeholder, style, value,disabled }) => {
  return (
    <div>
      {disabled ? <input autoComplete='true' value={value} style={style} type={type} name={name} placeholder={placeholder} onChange={(e) => onChangeFunc(e)} className={className} disabled={disabled} />
        :
        <input autoComplete='true' value={value} style={style} type={type} name={name} placeholder={placeholder} onChange={(e) => onChangeFunc(e)} className={className} />}
    </div>
  )
}

export default Input