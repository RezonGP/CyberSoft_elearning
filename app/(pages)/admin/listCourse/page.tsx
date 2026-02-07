"use client"

import React from 'react'
import { CardImage } from './components/card'
import CourseTap from './components/CourseTap'
import { useState } from "react"
import { Category } from "@/app/types"

export default function Course() {
    const [role, setRole] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    console.log(setRole);

    return (
        <div>
            <div className=" container mx-auto">

                <CourseTap onCategoryChange={setSelectedCategory} />
                <CardImage selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}
