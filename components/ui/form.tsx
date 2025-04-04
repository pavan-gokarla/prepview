"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { toast } from "sonner"
import { GoogleSignIn } from "@/actions/userActions"

export function CardWithForm() {
  const [goolgeIsloading, setGoogleIsLoading] = useState(false)
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-[100%] mb-4">
          <Button onClick={async () => {
            await GoogleSignIn()
          }} variant="outline" className="w-[100%] cursor-pointer flex items-center justify-center gap-2">
            <FcGoogle size={20} />
            Google
          </Button>
        </div>
        <div className="w-[100%] mb-4">
          <Button onClick={() => {
            toast.error("Github login is under maintainence")
          }} variant="outline" className="w-[100%] cursor-pointer flex items-center justify-center gap-2">
            <FaGithub size={20} />
            Github
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

