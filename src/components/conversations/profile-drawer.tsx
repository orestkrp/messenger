"use client";

import { useUser } from "@/hooks/use-user";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { FC, Fragment, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Avatar } from "../ui/avatar";
import { ConfirmModal } from "../ui/confirm-modal";
import { GroupAvatar } from "../ui/group-avatar";
import useActiveList from "@/context/use-active-list";

interface ProfileDrawer {
  onClose: () => void;
  isOpen: boolean;
  conversation: Conversation & { users: User[] };
}

export const ProfileDrawer: FC<ProfileDrawer> = ({
  onClose,
  isOpen,
  conversation,
}) => {
  const otherUser = useUser(conversation);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const title = conversation.name || otherUser.name;

  const joinedDate = format(new Date(otherUser.createdAt), "PP");

  const statusText = isActive ? "Active" : "Offline";

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <ConfirmModal
          title="Delete conversation"
          message="Are you sure you want to delete this conversation? This action cannot be undone."
          isOpen={confirmDeleteModalOpen}
          onClose={() => setConfirmDeleteModalOpen(false)}
        />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 "
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          {conversation.isGroup ? (
                            <GroupAvatar users={conversation.users} />
                          ) : (
                            <Avatar user={otherUser} />
                          )}
                        </div>
                        <div>{title}</div>
                        <div className="text-sm text-gray-500">
                          {statusText}
                        </div>
                        <div className="my-8 flex gap-10">
                          <div
                            onClick={() => setConfirmDeleteModalOpen(true)}
                            className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                              <IoTrash size={20} />
                            </div>
                            <div className="text-sm font-light text-neutral-600">
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {conversation.isGroup && (
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  Emails
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {conversation.users
                                    .map((user) => user.email)
                                    .join(", ")}
                                </dd>
                              </div>
                            )}
                            {!conversation.isGroup && (
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!conversation.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Joined
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
