"use client";

import React, { useEffect, useRef } from "react";
import useFetch from "../../../../../hooks/use-fetch";
import { scanReceipt } from "../../../../../action/transction";
import { Button } from "@react-email/components";
import { Camera, Loader2 } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

const ReceiptScanner = ({ onScanComplete }) => {
  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async(file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  const fileInputRef = useRef();
  
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br rounded-xl from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white !flex !items-center !justify-center !p-0"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {scanReceiptLoading ? (
          <div className="flex items-center justify-center gap-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="whitespace-nowrap">Scanning Receipt...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera className="h-4 w-4" />
            <span className="text-sm whitespace-nowrap">Scan Receipt with AI</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;