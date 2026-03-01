import React from 'react'

export default function Banner() {
  return (
    <div>
      <h2 className='mt-6 text-4xl font-bold text-primary font-heading'>Banner Section</h2>
      <hr className='text-2xl text-secondary'></hr>
      <div className="text-primary text-2xl">Primary Default</div>
<div className="text-primary-600 text-2xl">Primary 600</div>
<div className="bg-secondary text-white p-3">Secondary Default</div>
<div className="bg-secondary-500 text-white p-3">Secondary 500</div>
    </div>
  )
}
