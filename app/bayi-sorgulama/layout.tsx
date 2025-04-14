import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bayi Sorgulama",
  description: "Türkiye çapındaki bayilerimizi harita üzerinde görüntüleyin.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
} 