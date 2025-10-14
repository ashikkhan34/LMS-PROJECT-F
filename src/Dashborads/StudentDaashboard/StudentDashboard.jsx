import React from 'react'

export default function StudentDashboard() {
    // 🔹 get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  return (
    <div className='pt-16'>
      <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
      </div>
    </div>
  )
}
