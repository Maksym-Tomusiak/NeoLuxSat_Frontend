import CloseIcon from '@/assets/svgs/close-icon.svg';
import { Fragment, useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import type {
  ModalData,
  ContentBlock,
  ContentListItem,
} from '@/types/materials';
import React from 'react';

type ContentRendererProps = {
  content: ContentBlock[];
};

const ModalContentRenderer = ({ content }: ContentRendererProps) => {
  return (
    <div className="flex flex-col gap-[24px] text-primryBlue font-noto">
      {content.map((block: ContentBlock, index) => {
        if (block.type === 'paragraph') {
          return (
            <div key={index}>
              <p className="">
                {block.lead && (
                  <strong className="font-medium">{block.lead}</strong>
                )}{' '}
                {block.text}
              </p>
              {block.list && (
                <ul className="mt-2 list-disc list-inside pl-4 space-y-1">
                  {block.list.map((item: ContentListItem, itemIndex) => (
                    <li key={itemIndex}>
                      {item.lead && (
                        <strong className="text-medium">{item.lead}</strong>
                      )}{' '}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

type InfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null; // Data can be null when closed
};

const InfoModal = ({ isOpen, onClose, data }: InfoModalProps) => {
  const [latchedData, setLatchedData] = useState<ModalData | null>(data);

  useEffect(() => {
    if (data) {
      setLatchedData(data);
    }
  }, [data]);

  const handleAfterLeave = () => {
    setLatchedData(null);
  };

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      afterLeave={handleAfterLeave}
    >
      <Dialog as="div" className="relative z-2000" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 leave-application-modal-backdrop"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 px-4">
          <div className="flex min-h-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <DialogPanel
                as="div"
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] p-[24px] bg-primaryWhite flex flex-col gap-[40px] md:gap-[56px]"
              >
                {latchedData && (
                  <>
                    <div className="flex flex-row justify-between items-start font-noto text-primaryBlue">
                      <div className="flex flex-col gap-[16px]">
                        <DialogTitle
                          as="h2"
                          className="text-[24px]/[120%] font-medium tracking-[-0.48px]"
                        >
                          {latchedData.title}
                        </DialogTitle>
                        <p className="text-primaryBlue/80 text-[16px]/[120%] tracking-[-0.32px] xs:max-w-[75%]">
                          {latchedData.subtitle}
                        </p>
                      </div>
                      <button
                        className="fill-primaryOrange cursor-pointer close-button"
                        onClick={onClose}
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div className="font-noto text-primaryBlue">
                      <ModalContentRenderer
                        content={latchedData.content || []}
                      />
                    </div>
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default React.memo(InfoModal);
