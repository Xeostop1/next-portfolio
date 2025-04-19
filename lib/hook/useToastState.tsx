'use client';

import { useState, useCallback } from 'react';

export function useToastState() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000); 
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    message,
    visible,
    showToast,
    hideToast,
  };
}
