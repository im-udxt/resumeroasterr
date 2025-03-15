'use client';

import dynamic from 'next/dynamic';
import { Toaster as HotToaster } from 'react-hot-toast';

const Toaster = dynamic(
  () => Promise.resolve(HotToaster),
  {
    ssr: false,
  }
);

export default Toaster; 