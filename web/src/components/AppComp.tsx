import React, { useState, useEffect } from 'react';
import {
  MantineProvider,
  Center,
  Text,
  Box,
  Flex
} from '@mantine/core';
import { rgba } from '@mantine/core';
import { fetchNui } from '../utils/fetchNui';

export default function AppComp() {
  const [title, setTitle] = useState('Inner Voice');
  const [placeholder, setPlaceholder] = useState('Loading...');
  const [isVisible, setIsVisible] = useState(false);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');

  useEffect(() => {
    let index = 0;
    let typingTimeout: number;

    const typeText = () => {
      if (index <= placeholder.length) {
        setDisplayedPlaceholder(placeholder.substring(0, index));
        index++;
        typingTimeout = setTimeout(typeText, 75);
      } else {
        typingTimeout = setTimeout(() => {
          fetchNui('hide-ui');
          setDisplayedPlaceholder('');
        }, 2000);
      }
    };

    if (isVisible) {
      setDisplayedPlaceholder('');
      typeText();
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [placeholder, isVisible]);
  useEffect(() => {
    const handleMessage = (event: { data: { action: string; data: any; }; }) => {
      const { action, data } = event.data;

      if (action === 'setVisible') {
        if (data) {
          setIsVisible(true);
        } else {
          setTimeout(() => setIsVisible(false), 500);
        }
      }

      if (action === 'updateData') {
        setTitle(data.title || 'Inner Voice');
        setPlaceholder(data.placeholder || 'Loading...');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <MantineProvider forceColorScheme="dark">
      {isVisible && (
        <Center
          style={{
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <Box
            style={{
              width: 'fit-content',
              backgroundColor: rgba('#1A1B1E', 1.0),
              padding: '7px',
              borderRadius: '5px',
              marginTop: '45%',
              marginBottom: '5px',
            }}
          >
            <Flex align="center" gap="sm"> 
              <Text color="#ffffff" fw={530}>{title}:</Text>
              <Text size="15px" fw={450} color="#ffffff">
                {displayedPlaceholder}
              </Text>
            </Flex>
          </Box>
        </Center>
      )}
    </MantineProvider>
  );
}
