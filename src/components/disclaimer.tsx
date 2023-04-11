import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Text,
} from '@chakra-ui/react';

export default function Disclaimer({
  disclaimerAccepted,
  setDisclaimerAccepted,
}: {
  disclaimerAccepted: boolean;
  setDisclaimerAccepted: Function;
}) {
  const onClose = () => setDisclaimerAccepted(true);

  return !disclaimerAccepted ? (
    <Alert mb={5} p={5} status="error">
      <AlertIcon />
      <Box>
        <AlertTitle>DISCLAIMER (Please Read)</AlertTitle>
        <AlertDescription>
          <Text mt={3} fontWeight="bold">
            THIS APPLICATION DOES NOT PROVIDE MEDICAL ADVICE.
          </Text>
          The information provided is for educational purposes only. Thought
          Coach is a research project to explore the possibilities for AI to be
          used in the field of mental health treatment. It is not a substitute
          for professional medical advice or therapy. The text content generated
          may provide false or biased information and should not be relied upon
          as being accurate or appropriate.{' '}
          <Text mt={3}>
            {' '}
            If you think you are experiencing any medical condition you should
            seek immediate medical attention from a doctor or other professional
            healthcare provider.
          </Text>
          <Text mt={3}>
            {' '}
            By closing this disclaimer message you are acknowledging the above
            information.
          </Text>
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <></>
  );
}
