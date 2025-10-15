import React from 'react'
import Hero from '../Components/Hero/Hero'
import CategoryCourses from '../Components/CourseCategory/Category'
import Exceptional from '../Components/Exceptional/Exceptional'
import Event from '../Components/events/Event'
import StudentReview from '../Components/StudentReview/StudentReview'
import AllStudentReview from '../Components/StudentReview/AllStudentReview'

export default function Home() {
  return (
    <div>
        <Hero></Hero>
        <CategoryCourses></CategoryCourses>
        <Exceptional></Exceptional>
        <Event></Event>
        <StudentReview></StudentReview>
        <AllStudentReview></AllStudentReview>
    </div>
  )
}
