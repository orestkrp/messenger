
import { prismaClient } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const POST = async (request: Request) => {
try {
  const { email, name, password } = await request.json();

  if (!name) {
    return new NextResponse("Name missed", { status: 400 });
  }

  if (!email) {
    return new NextResponse("Email missed", { status: 400 });
  }

  if (!password) {
    return new NextResponse("Password missed", { status: 400 });
  }

  const isUserRegistered = await prismaClient.user.findUnique({
    where: { email },
  });

  if(isUserRegistered) {
    return new NextResponse("User with this email already exists", { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "Error during registration");
    return new NextResponse("Internal Error", { status: 500 });
  }
};