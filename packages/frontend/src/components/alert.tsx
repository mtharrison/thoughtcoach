import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

import { WarningIcon } from '@chakra-ui/icons';

import { useRef } from 'react';

export interface AlertProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function Alert(props: AlertProps) {
  const { open, onClose, title, description } = props;

  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isCentered={true}
      isOpen={open}
      size={'xl'}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <WarningIcon w={8} h={8} mr={4} color="red.500" />
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose()}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
