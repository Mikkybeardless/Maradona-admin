// components/MediaSection.tsx
import React from "react";

import { FileUpload } from "../FileUpload";

interface MediaSectionProps {
  auctionDetails: Auction;
  setAuctionDetails: (details: any) => void;
}

export const MediaSection: React.FC<MediaSectionProps> = ({
  auctionDetails,
  setAuctionDetails,
}) => {
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <div className="w-full flex justify-between items-start">
        <h4 className="text-lg font-semibold">Media</h4>
      </div>

      <FileUpload
        acceptedFileTypes={{
          "image/jpeg": [],
          "image/png": [],
          "video/mp4": [],
        }}
        maxSizeMB={20}
        files={auctionDetails.media}
        setFiles={(newFiles) => {
          setAuctionDetails((prev: Auction) => ({
            ...prev,
            media:
              typeof newFiles === "function" ? newFiles(prev.media) : newFiles,
          }));
        }}
      />
    </div>
  );
};
