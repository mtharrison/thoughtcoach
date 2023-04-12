import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Divider,
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
    <Alert mb={5} p={5} status="error" rounded={'md'}>
      <Box>
        <AlertTitle>DISCLAIMER</AlertTitle>
        <AlertDescription>
          <Text mt={3} fontWeight="bold">
            THIS APPLICATION DOES NOT PROVIDE MEDICAL ADVICE.
          </Text>
          <Text mt={4}>
            This research app is intended to explore the potential for using
            artificial intelligence in mental health therapy. It is not intended
            to replace professional medical advice, diagnosis, or treatment. The
            information provided by the app is for educational and research
            purposes only.
          </Text>
          <Text mt={4}>
            The use of this app does not create a therapist-patient
            relationship. If you are experiencing a mental health emergency,
            please contact your local emergency services immediately. The
            creators of this app are not responsible for any errors or omissions
            in the information provided by the app. The creators make no
            representations or warranties of any kind, express or implied, about
            the completeness, accuracy, reliability, suitability, or
            availability with respect to the app or the information, products,
            services, or related graphics contained in the app for any purpose.
          </Text>
          <Text mt={4}>
            Any reliance you place on such information is therefore strictly at
            your own risk. The creators of this app disclaim any liability for
            any damage or loss, including without limitation, indirect or
            consequential loss or damage, or any damage or loss whatsoever
            arising from loss of data or profits arising out of, or in
            connection with, the use of this app. By using this app, you
            acknowledge that you have read and understood this legal disclaimer
            and agree to be bound by its terms and conditions.
          </Text>
          <Button mt={5} colorScheme="red" onClick={onClose}>
            Accept
          </Button>
        </AlertDescription>
      </Box>
    </Alert>
  ) : (
    <></>
  );
}
