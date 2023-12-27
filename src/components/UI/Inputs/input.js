import React from "react";


const input = (props) => {

  return (

    <input
      type={props.type || 'text'}
      id={props.id}
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
      {props.children}
    </input>

  )
}

export default input;