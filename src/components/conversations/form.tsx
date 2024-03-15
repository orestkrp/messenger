"use client";

import axios from "axios";
import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/hooks/use-conversations";
import { MessageInput } from "./message-input";

export const Form: FC = () => {
  const { conversationId } = useConversation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    reset();
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="
        flex 
        w-full 
        items-center 
        gap-2
        border-t 
        bg-white 
        px-4 
        py-4 
        lg:gap-4
      "
    >
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onSuccess={handleUpload}
        uploadPreset="j4kklgzr"
      >
        <FaRegImage size={30} className="text-gray-600" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          placeholder={"Write a message"}
          register={register}
          required
        />
        <button
          type="submit"
          className="
            cursor-pointer 
            rounded-full 
            bg-gray-600 
            p-2 
            transition 
            hover:opacity-75
          "
        >
          <IoSendSharp size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};
