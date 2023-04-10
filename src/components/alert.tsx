import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Button,
  AlertDialogHeader,
  useDisclosure,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  CardFooter,
} from "@chakra-ui/react";

import { useRef } from "react";

import * as constants from "../constants";

export default function Alert({
  message,
  isOpen,
}: {
  message: string;
  isOpen: boolean;
}) {
  const { onClose } = useDisclosure();
  const cancelRef = useRef(null);
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        //@ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Error
            </AlertDialogHeader>

            <AlertDialogBody>
              An error occured: {message}. Refresh and try again.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
