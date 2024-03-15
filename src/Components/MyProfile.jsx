import React from 'react'

function MyProfile() {
  return (
    <div className='text-center card shadow m-3 py-3'>
        <h3>MyProfile</h3>
        <label style={{marginBottom:'20px'}}>
                <input type="file" style={{display:'none'}}/>
                <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="" width={"100px"} height={"100px"}/>
        </label>
        <div className='w-50' style={{marginLeft:'190px'}}>
            <input type="text" placeholder='User Name' className='form-control mb-3' />
            <input type="text" placeholder='GitHub' className='form-control mb-3' />
            <input type="text" placeholder='LinkedIn' className='form-control mb-3' />
        </div>
    </div>
  )
}

export default MyProfile