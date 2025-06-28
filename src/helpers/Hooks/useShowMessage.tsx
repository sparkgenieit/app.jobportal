'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setToaster } from '@/store/generalSlice'; // ✅ Adjust based on your actual alias or path

interface MessagePayload {
  status: 'success' | 'error' | string;
  message: string;
  path?: string;
  error?: any;
}

export default function useShowMessage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMessage = ({ status, message, path, error }: MessagePayload) => {
    let toaster = {
      show: true,
      type: '',
      text: message,
    };

    if (status?.toLowerCase() === 'success') {
      toaster.type = 'success';
    } else if (status?.toLowerCase() === 'error') {
      toaster.type = 'error';
      toaster.text = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message[0]
        : error?.response?.data?.message || error?.message || 'Something went wrong';
    }

    dispatch(setToaster(toaster));

    if (path) {
      router.push(path);
    }
  };

  return handleMessage;
}
