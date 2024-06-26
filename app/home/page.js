"use client"
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        // You can use parsedUser if needed
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, []);


  return (
    <>

      <Typography variant="h1">My Home page</Typography>
    </>
  )
}
