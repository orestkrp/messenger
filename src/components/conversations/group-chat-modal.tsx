"use client";
import { FC, useState } from "react";
import Modal from "../ui/modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";

interface GroupChatModalProps {
  isOpen: boolean;
  users: User[];
  onClose: () => void;
}

export const GroupChatModal: FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    axios
      .post("/api/conversations/", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const members = watch("members");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create a group chat
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-800">
            Create chat with more than 2 people
          </p>
          <div className="mt-5 flex flex-col gap-4">
            <Input
              id="name"
              errors={errors}
              register={register}
              disabled={isLoading}
              required
              label="Name"
            />
            <Select
              disabled={isLoading}
              label="Members"
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
              onChange={(value) => {
                setValue("members", value, { shouldValidate: true });
              }}
              value={members}
            />
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
