import React,{useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id=useId();
  return (
    <div className='w-full'>
        <select 
        {...props} 
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            <option value="" disabled selected hidden>{label}</option>
            {options?.map((option)=>(
                <option key={option} className='w-full' value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)