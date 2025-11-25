"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface BankData {
  id: string;
  logo: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const banks: BankData[] = [
  {
    id: "bca",
    logo: "/images/payments/bca.png",
    bankName: "Bank BCA",
    accountNumber: "1234567890",
    accountName: "PandawaRent",
  },
  {
    id: "mandiri",
    logo: "/images/payments/mandiri.png",
    bankName: "Bank Mandiri",
    accountNumber: "9876543210",
    accountName: "PandawaRent",
  },
  {
    id: "bni",
    logo: "/images/payments/bni.png",
    bankName: "Bank BNI",
    accountNumber: "5566778899",
    accountName: "PandawaRent",
  },
  {
    id: "bri",
    logo: "/images/payments/bri.png",
    bankName: "Bank BRI",
    accountNumber: "1122334455",
    accountName: "PandawaRent",
  },
];

export default function BankAccordion() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full bg-white-background py-8 px-12 rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        {/* Price Total */}
        <div>
          <p className="text-gray text-sm mb-1">Total Price</p>
          <p className="text-black text-2xl font-bold">Rp 2.400K</p>
        </div>
      </div>

      <p className="text-black text-lg font-semibold mt-5 font-manrope">Payment Method</p>

      <Accordion type="single" collapsible className="w-full font-manrope">

        {/* BANK LIST */}
        {banks.map((bank) => (
          <AccordionItem key={bank.id} value={bank.id} className="border-b border-gray/20 px-4">
            <AccordionTrigger className="flex items-center gap-3 py-4 h-14 cursor-pointer">
              <div className="flex items-center gap-6">  
              <img src={bank.logo} alt={bank.bankName} width={50} height={50} />
              <span className="text-black font-medium">{bank.bankName}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-4 pl-2">
              <div className="flex flex-col gap-2 text-gray text-sm">
                <p>
                  <span className="font-medium text-black">Account Number:</span> {bank.accountNumber}
                </p>

                <p>
                  <span className="font-medium text-black">Account Name:</span> {bank.accountName}
                </p>

                <Button
                  variant="outline"
                  className="mt-2 w-fit flex items-center gap-2 cursor-pointer"
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
        <AccordionItem value="qris" className="border-b border-gray/20 rounded-lg px-4">
          <AccordionTrigger className="flex items-center gap-3 py-4">
            <div className="flex items-center gap-6">  
            <img src="/images/payments/QRIS.png" alt="QRIS" width={50} height={50} />
            <span className="text-black font-medium">QRIS</span>
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
              <p className="text-gray text-sm">Scan using any e-wallet</p>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
