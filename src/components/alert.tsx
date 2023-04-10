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

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

import { useRef } from "react";

import * as constants from "../constants";

export default function Alert({
  isOpen,
  dialogClose,
}: {
  dialogClose: Function;
  isOpen: boolean;
}) {
  return (
    <>
      <AlertDialog
        isCentered={true}
        isOpen={isOpen}
        //@ts-ignore
        size={"xl"}
        //@ts-ignore
        onClose={dialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <WarningIcon w={8} h={8} mr={4} color="red.500" />
              We're sorry, an error occured
            </AlertDialogHeader>

            <AlertDialogBody>
              This is a known issue that we're working to resolve. Close this
              dialog box and try to submit your request again.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => dialogClose()}>Cancel</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
