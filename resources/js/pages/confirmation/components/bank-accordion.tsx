'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  totalPrice: number;
}

interface BankData {
  id: string;
  logo: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const banks: BankData[] = [
  {
    id: 'bca',
    logo: '/images/payments/bca.png',
    bankName: 'Bank BCA',
    accountNumber: '1234567890',
    accountName: 'PandawaRent',
  },
  {
    id: 'mandiri',
    logo: '/images/payments/mandiri.png',
    bankName: 'Bank Mandiri',
    accountNumber: '9876543210',
    accountName: 'PandawaRent',
  },
  {
    id: 'bni',
    logo: '/images/payments/bni.png',
    bankName: 'Bank BNI',
    accountNumber: '5566778899',
    accountName: 'PandawaRent',
  },
  {
    id: 'bri',
    logo: '/images/payments/bri.png',
    bankName: 'Bank BRI',
    accountNumber: '1122334455',
    accountName: 'PandawaRent',
  },
];

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  const priceInK = price / 1000;
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }
  return `${priceInK.toFixed(1)}K`;
};

export default function BankAccordion({ totalPrice }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full rounded-xl bg-white-background px-12 py-8 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Price Total */}
        <div>
          <p className="mb-1 text-sm text-gray">Total Price</p>
          <p className="text-2xl font-bold text-black">
            {totalPrice > 0
              ? `Rp ${formatPrice(totalPrice)}`
              : 'Calculating...'}
          </p>
        </div>
      </div>

      <p className="mt-5 font-manrope text-lg font-semibold text-black">
        Payment Method
      </p>

      <Accordion type="single" collapsible className="w-full font-manrope">
        {/* BANK LIST */}
        {banks.map((bank) => (
          <AccordionItem
            key={bank.id}
            value={bank.id}
            className="border-b border-gray/20 px-4"
          >
            <AccordionTrigger className="flex h-14 cursor-pointer items-center gap-3 py-4">
              <div className="flex items-center gap-6">
                <img
                  src={bank.logo}
                  alt={bank.bankName}
                  width={50}
                  height={50}
                />
                <span className="font-medium text-black">{bank.bankName}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-4 pl-2">
              <div className="flex flex-col gap-2 text-sm text-gray">
                <p>
                  <span className="font-medium text-black">
                    Account Number:
                  </span>{' '}
                  {bank.accountNumber}
                </p>

                <p>
                  <span className="font-medium text-black">Account Name:</span>{' '}
                  {bank.accountName}
                </p>

                <Button
                  variant="outline"
                  className="mt-2 flex w-fit cursor-pointer items-center gap-2"
                  onClick={() => copyToClipboard(bank.accountNumber)}
                >
                  <Copy className="size-4" />
                  Copy Number
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* QRIS */}
        <AccordionItem
          value="qris"
          className="rounded-lg border-b border-gray/20 px-4"
        >
          <AccordionTrigger className="flex items-center gap-3 py-4">
            <div className="flex items-center gap-6">
              <img
                src="/images/payments/QRIS.png"
                alt="QRIS"
                width={50}
                height={50}
              />
              <span className="font-medium text-black">QRIS</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/images/payments/qris-code.jpg"
                alt="QRIS Code"
                width={200}
                height={200}
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray">Scan using any e-wallet</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
