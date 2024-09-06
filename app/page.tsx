'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


  const authUser = () => {
    if (userEmail !== '' && userPassword !== '') {
      setIsLoading(true)
      fetch('https://pear-trusting-femur.glitch.me/v2/adlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'userEmail': userEmail,
          'userPassword': userPassword,
        })
      }).then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if(data.message == 'ok' && data.status == 200){
            router.replace('/dashboard');
          }else{
            alert(data.message);
          }
        });
    }else{
      alert('Error : Please fill all data');
    }
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={userEmail} onChange={e => { setUserEmail(e.currentTarget.value) }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={userPassword} onChange={e => { setUserPassword(e.currentTarget.value) }} />
            </div>
            <Button type="submit" className="w-full" onClick={() => { authUser() }} disabled={isLoading}>
              {isLoading ? 'Please Wait ...' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}